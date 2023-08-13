import { memo, useEffect } from 'react';

import { List } from 'renderer/List';
import { Chat } from 'renderer/Chat';

import { useGetFriendsFromStore, useGetUserFromStore } from 'store/selectors';
import { useAppDispatch } from 'store/hooks';
import { getUserFriends } from 'store/friends.store';

import './Friends.scss';

export const Friends = memo(() => {
  const { login } = useGetUserFromStore();
  const dispatch = useAppDispatch();
  const { isSuccess } = useGetFriendsFromStore();

  useEffect(() => {
    if (!isSuccess) dispatch(getUserFriends(login));
  }, [dispatch, isSuccess, login]);
  return (
    <div className="friends chat__container">
      <List />
      <Chat />
    </div>
  );
});
