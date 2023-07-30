import { ElectronHandler } from "main/preload";

export const ElectronStorage = () => window.electron.ipcRenderer;

export const getUserData = () => {
  ElectronStorage().once('get:user-data', args => {
    console.log('getUserData', args);
  });

  ElectronStorage().sendMessage('get:user-data', {
    key: 'userData'
  });
}
