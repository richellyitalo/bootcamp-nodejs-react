import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '~/assets/images/logo-from-flaticon.svg';
import { signUpRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  email: Yup.string()
    .email('E-mail inválido')
    .required('E-mail é obrigatório'),
  password: Yup.string()
    .min(6, 'Informe o mínimo de 6 caracteres')
    .required('Senha é obrigatória'),
});

export default function SignUp() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ name, email, password }) {
    dispatch(signUpRequest(name, email, password));
  }

  return (
    <>
      <img src={logo} alt="GoBarber" height="100" />

      <Form schema={schema} onSubmit={handleSubmit} noValidate>
        <Input name="name" placeholder="Nome" />
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input name="password" type="password" placeholder="Sua senha" />

        <button type="submit" disabled={!!loading}>
          {loading ? 'Carregando...' : 'Criar conta'}
        </button>
        <Link to="/">Já possuo conta</Link>
      </Form>
    </>
  );
}
