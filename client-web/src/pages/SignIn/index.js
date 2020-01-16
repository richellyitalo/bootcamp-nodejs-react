import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import logo from '~/assets/images/logo-from-flaticon.svg';
import { signinRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('E-mail inválido')
    .required('E-mail é obrigatório'),
  password: Yup.string().required('Senha é obrigatória'),
});

export default function SignIn() {
  const dispatch = useDispatch();

  function handleSubmit({ email, password }) {
    dispatch(signinRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="GoBarber" height="100" />

      <Form schema={schema} onSubmit={handleSubmit} noValidate>
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input name="password" type="password" placeholder="Sua senha" />

        <button type="submit">Acessar</button>
        <Link to="/register">Criar nova conta</Link>
      </Form>
    </>
  );
}
