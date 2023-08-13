export interface ISettings {
  menuItem: string;
}

export enum MENU_ITEMS {
  MAIN = 'main',
  FRIENDS = 'friends',
  ROOMS = 'rooms',
}

export interface IMenuItem {
  name: string;
  menuItem: string;
  icon: string;
}

type NotificationType = 'warning' | 'success' | 'error';
export interface INotificationData {
  type: NotificationType;
  message: string;
}
