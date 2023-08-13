import React, { memo, useCallback } from 'react';
import { useAppDispatch } from 'store/hooks';
import { useGetSettingsFromStore } from 'store/selectors';
import { setSettings } from 'store/settings.store';
import { menuList } from 'data/data';

import './Menu.scss';

export const Menu = memo(() => {
  const settings = useGetSettingsFromStore();
  const dispatch = useAppDispatch();

  const onClickHandler = useCallback(
    (menuItem: string) => {
      dispatch(setSettings({ ...settings, menuItem }));
    },
    [dispatch, settings]
  );

  return (
    <ul className="menu">
      {menuList.map((item) => {
        const className: string = `menu__item ${
          settings.menuItem === item.menuItem ? 'active' : ''
        }`;

        return (
          <li
            className={className}
            key={item.name}
            onClick={() => onClickHandler(item.menuItem)}
          >
            <img src={item.icon} alt="mainIcon" width={40} />
          </li>
        );
      })}
    </ul>
  );
});
