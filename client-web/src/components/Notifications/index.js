import React from 'react';

import { MdNotifications } from 'react-icons/md';

import {
  Container,
  Badge,
  NotificationList,
  Scroll,
  Notification,
} from './styles';

export default function Notifications() {
  return (
    <Container>
      <Badge hasUnread>
        <MdNotifications color="#7159c1" size={20} />
      </Badge>

      <NotificationList>
        <Scroll>
          <Notification unread>
            <p>Texto notificação</p>
            <time>há 60 mil dias</time>
            <button type="button">Marcar como lido</button>
          </Notification>
          <Notification unread>
            <p>Texto notificação</p>
            <time>há 60 mil dias</time>
            <button type="button">Marcar como lido</button>
          </Notification>
          <Notification>
            <p>Texto notificação</p>
            <time>há 60 mil dias</time>
            <button type="button">Marcar como lido</button>
          </Notification>
          <Notification>
            <p>Texto notificação</p>
            <time>há 60 mil dias</time>
            <button type="button">Marcar como lido</button>
          </Notification>
          <Notification>
            <p>Texto notificação</p>
            <time>há 60 mil dias</time>
            <button type="button">Marcar como lido</button>
          </Notification>
          <Notification>
            <p>Texto notificação</p>
            <time>há 60 mil dias</time>
            <button type="button">Marcar como lido</button>
          </Notification>
        </Scroll>
      </NotificationList>
    </Container>
  );
}
