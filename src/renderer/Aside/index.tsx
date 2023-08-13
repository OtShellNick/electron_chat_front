import React, { memo } from 'react';
import { Menu } from './Menu';
import './Aside.scss';

export const Aside = memo(() => {
  return (
    <aside className="aside">
      <Menu />
    </aside>
  );
});
