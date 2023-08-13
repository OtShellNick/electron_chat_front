import { ISettings, MENU_ITEMS, IMenuItem } from 'types/types.dict';
import mainIcon from 'assets/icons/main.svg';
import friendsIcon from 'assets/icons/friends.svg';
import roomsIcon from 'assets/icons/rooms.svg';

export const defaultSettings: ISettings = {
  menuItem: MENU_ITEMS.MAIN,
};

export const menuList: IMenuItem[] = [
  {
    name: 'Главная',
    menuItem: MENU_ITEMS.MAIN,
    icon: mainIcon,
  },
  {
    name: 'Друзья',
    menuItem: MENU_ITEMS.FRIENDS,
    icon: friendsIcon,
  },
  {
    name: 'Комнаты',
    menuItem: MENU_ITEMS.ROOMS,
    icon: roomsIcon,
  },
];

export const Icons = {
  mainIcon,
};
