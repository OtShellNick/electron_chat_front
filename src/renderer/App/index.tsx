import { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import { setListeners, getUserData } from 'helpers/storage';
import { getUserFromStore } from 'store/selectors';
import { userDataListener } from 'helpers/listeners';

import { Hello } from 'renderer/Hello';
import { Login } from 'renderer/Login';

import './App.css';
import { useAppDispatch } from 'store/hooks';
import { setUser } from 'store/user.store';

export function App() {
  const nav = useNavigate();
  const location = useLocation();
  const user = getUserFromStore();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setListeners();
    getUserData();
  }, []);

  useEffect(() => {
    const userListener = userDataListener.subscribe((userData) => {
      dispatch(setUser({ user: userData }));
    });

    return () => {
      userListener.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const { id } = user;

    if (id) nav('/');

    if (!id && location.pathname !== '/login') nav('/login');
  }, [user]);

  return (
    <Routes>
      <Route path="/" element={<Hello />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
