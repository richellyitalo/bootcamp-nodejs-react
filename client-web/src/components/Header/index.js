import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Content, Profile } from './styles';
import Notifications from '~/components/Notifications';
import logo from '~/assets/images/logo-from-flaticon.svg';

export default function Header() {
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} height={40} alt="GoBarber" />
          <Link to="/dashboard">DASHBOARD</Link>
        </nav>

        <aside>
          <Notifications />
          <Profile>
            <div>
              <strong>Usuário</strong>
              <Link to="/profile">Meu perfil</Link>
            </div>
            <img
              src="https://api.adorable.io/avatars/109/abott@adorable.png"
              height={40}
              alt="Usuário"
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
