import { all, call, put, takeLatest } from 'redux-saga/effects';
import api from '~/services/api';
import { signInSuccess } from './actions';
import history from '~/services/history';

export function* signIn({ payload }) {
  const { email, password } = payload;

  const response = yield call(api.post, 'sessions', {
    email,
    password,
  });

  const { user, token } = response.data;

  if (!user.provider) {
    console.tron.error('Usuário não logado');
    return;
  }

  yield put(signInSuccess(user, token));

  history.push('/dashboard');
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
