import React from 'react';
import { Link } from 'react-router-dom';
import logo from '~/assets/images/logo-from-flaticon.svg';

export default function index() {
  return (
    <>
      <img src={logo} alt="GoBarber" height="100" />

      <form>
        <input type="email" placeholder="Seu e-mail" />
        <input type="password" placeholder="Sua senha" />

        <button type="submit">Acessar</button>
        <Link to="/register">Criar nova conta</Link>
      </form>
    </>
  );
}
