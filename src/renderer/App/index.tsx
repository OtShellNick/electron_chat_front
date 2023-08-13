import { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import { setListeners, getUserData, getAuthToken } from 'helpers/storage';
import { useGetTokenFromStore, useGetUserFromStore } from 'store/selectors';
import { userDataListener, authTokenListener } from 'helpers/listeners';

import { Layout } from 'renderer/Layout';
import { Hello } from 'renderer/Hello';
import { Login } from 'renderer/Login';

import './App.css';
import { useAppDispatch } from 'store/hooks';
import { setToken, setUser } from 'store/user.store';
import apiClient from 'helpers/server';

export function App() {
  const nav = useNavigate();
  const location = useLocation();
  const user = useGetUserFromStore();
  const dispatch = useAppDispatch();
  const tokenFromStore = useGetTokenFromStore();

  useEffect(() => {
    setListeners();
    getAuthToken();
    getUserData();
  }, []);

  useEffect(() => {
    const userListener = userDataListener.subscribe((userData) => {
      dispatch(setUser({ user: userData }));
    });

    const tokenListener = authTokenListener.subscribe((token) => {
      dispatch(setToken(token));
    });

    return () => {
      userListener.unsubscribe();
      tokenListener.unsubscribe();
    };
  }, [dispatch]);

  useEffect(() => {
    const { id } = user;

    if (id) nav('/');

    if (!id && location.pathname !== '/login') nav('/login');
  }, [location.pathname, nav, user]);

  useEffect(() => {
    if (tokenFromStore) apiClient.setAuthToken(tokenFromStore);
  }, [tokenFromStore]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index path="/" element={<Hello />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
