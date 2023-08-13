import { AuthResponseData } from 'types/action.types';
import { sendNotification } from './notify';

const ElectronStorage = window.electron.ipcRenderer;

export const getUserData = () => {
  ElectronStorage.sendMessage('get:user-data', { key: 'userData' });
};

export const setUserData = (key: string, value: AuthResponseData) => {
  ElectronStorage.sendMessage('save:user-data', {
    key,
    value,
  });
};

export const getAuthToken = () => {
  ElectronStorage.sendMessage('get:token', { key: 'token' });
};

export const removeUserData = (key: string) => {
  ElectronStorage.sendMessage('remove:user-data', { key });
};

export const setListeners = () => {
  ElectronStorage.on('get:user-data', (userData) => {
    sendNotification('userData', userData);
  });

  ElectronStorage.on('get:token', (token) => {
    const { token: tokenData } = token as { token: string };
    sendNotification('token', tokenData);
  });
};
