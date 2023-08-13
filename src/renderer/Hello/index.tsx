import { useMemo } from 'react';
import { useGetSettingsFromStore } from 'store/selectors';
import { MENU_ITEMS } from 'types/types.dict';

import { Friends } from 'renderer/Friends';
import { Rooms } from 'renderer/Rooms';

import './Hello.scss';

export function Hello() {
  const { menuItem } = useGetSettingsFromStore();

  const renderMain = useMemo(() => {
    switch (menuItem) {
      case MENU_ITEMS.FRIENDS:
        return <Friends />;
      case MENU_ITEMS.ROOMS:
        return <Rooms />;
      default:
        return <h1>Главная</h1>;
    }
  }, [menuItem]);

  return <main className="hello">{renderMain}</main>;
}
