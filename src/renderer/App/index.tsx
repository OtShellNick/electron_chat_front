import { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import { Hello } from 'renderer/Hello';
import { Login } from 'renderer/Login';

import './App.css';

export function App() {
  const nav = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/login') {
      nav('/login');
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Hello />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
