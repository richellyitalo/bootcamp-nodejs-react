import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '~/assets/images/logo-from-flaticon.svg';

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  email: Yup.string()
    .email('E-mail inválido')
    .required('E-mail é obrigatório'),
  password: Yup.string()
    .min(6, 'Informe o mínimo de 6 caracteres')
    .required('Senha é obrigatória'),
});

export default function index() {
  return (
    <>
      <img src={logo} alt="GoBarber" height="100" />

      <Form schema={schema} noValidate>
        <Input name="name" placeholder="Nome" />
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input name="password" type="password" placeholder="Sua senha" />

        <button type="submit">Criar conta</button>
        <Link to="/">Já possuo conta</Link>
      </Form>
    </>
  );
}
