import { AuthResponseData } from 'types/action.types';
import { sendNotification } from './notify';

const ElectronStorage = window.electron.ipcRenderer;

export const getUserData = () => {
  ElectronStorage.sendMessage('get:user-data', { key: 'userData' });
};

export const setUserData = (key: string, value: AuthResponseData) => {
  ElectronStorage.sendMessage('save:user-data', {
    key,
    value
  });
};

export const setListeners = () => {
  ElectronStorage.on('get:user-data', (userData) => {
    const user = JSON.parse(userData as string);
    sendNotification('userData', user);
  });
};
