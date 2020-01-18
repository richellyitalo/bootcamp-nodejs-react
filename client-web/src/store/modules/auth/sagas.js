import { all, call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import { signInSuccess, signFailure, setLoading } from './actions';
import history from '~/services/history';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { user, token } = response.data;

    if (!user.provider) {
      toast.error('Usuário não é fornecedor');
      return;
    }

    yield put(signInSuccess(user, token));

    api.defaults.headers.Authorization = `Bearer ${token}`;

    history.push('/dashboard');
  } catch (err) {
    toast.error('Falha na autenticação');
    yield put(signFailure(false));
  }
}

export function* signUp({ payload }) {
  const { name, email, password } = payload;

  try {
    yield call(api.post, 'users', {
      name,
      email,
      password,
      provider: true,
    });

    yield put(setLoading(false));

    toast.success(
      'Conta criada com sucesso! Preencha os novos dados para logar.'
    );

    history.push('/');
  } catch (error) {
    toast.error('Erro ao cadastrar. Verifique seus dados.');
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
]);
