import { memo } from 'react';
import { List } from 'renderer/List';
import { Chat } from 'renderer/Chat';
import './Rooms.scss';

export const Rooms = memo(() => {
  return (
    <div className="rooms chat__container">
      <List />
      <Chat />
    </div>
  );
});
