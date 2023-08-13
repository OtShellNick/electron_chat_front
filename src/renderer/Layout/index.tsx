import React, { memo, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from 'renderer/Header';
import { Aside } from 'renderer/Aside';
import { Notification } from 'components/Notify';

import { useGetTokenFromStore } from 'store/selectors';
import SocketConnection from 'helpers/socket';

import './Layout.scss';

const socket = new SocketConnection('ws://185.20.225.15:3000/ws');

export const Layout = memo(() => {
  const token = useGetTokenFromStore();
  useEffect(() => {
    if (token) {
      socket.connect(token);
    }

    return () => {
      socket.disconnect();
    };
  }, [token]);
  return (
    <main className="layout">
      <Notification />
      <Header />
      <div className="layout__content">
        <Aside />
        <Outlet />
      </div>
    </main>
  );
});
