import React from 'react';
import { Link } from 'react-router-dom';
import logo from '~/assets/images/logo-from-flaticon.svg';

export default function index() {
  return (
    <>
      <img src={logo} alt="GoBarber" height="100" />

      <form>
        <input placeholder="Nome" />
        <input type="email" placeholder="Seu e-mail" />
        <input type="password" placeholder="Sua senha" />

        <button type="submit">Criar conta</button>
        <Link to="/">Já possuo conta</Link>
      </form>
    </>
  );
}
