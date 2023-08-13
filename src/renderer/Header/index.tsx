import React, { memo, useEffect } from 'react';

import { Button } from 'components/Button';

import { useGetUserFromStore } from 'store/selectors';
import { removeUser } from 'store/user.store';
import { removeUserData } from 'helpers/storage';
import { useAppDispatch } from 'store/hooks';

import './Header.scss';
import { useNavigate } from 'react-router-dom';

export const Header = memo(() => {
  const user = useGetUserFromStore();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onClickHandler = () => {
    dispatch(removeUser());
    removeUserData('userData');
    navigate('/login');
  };

  useEffect(() => {
    console.log('@@user', user);
  }, [user]);
  return (
    <header className="header">
      <b>{user.login}</b>
      <Button variant="danger" onClick={onClickHandler}>
        Выход
      </Button>
    </header>
  );
});
