import { ipcMain } from 'electron';

import storage from 'electron-json-storage';

export type StorageTypes =
  | 'save:user-data'
  | 'get:user-data'
  | 'remove:user-data'
  | 'get:token';

export const ElectronStorage = () => {
  console.log('path', storage.getDefaultDataPath());

  ipcMain.on('get:user-data', (event, data) => {
    event.reply('get:user-data', storage.getSync(data.key));
  });

  ipcMain.on('save:user-data', (event, { key, value }) => {
    console.log('@@value', value);
    storage.set(key, value, (error) => {
      console.log('@@error', error);
    });
  });

  ipcMain.on('remove:user-data', (event, { key }) =>
    storage.remove(key, (error) => {
      console.log('@@error', error);
    })
  );

  ipcMain.on('get:token', (event, data) => {
    event.reply('get:token', storage.getSync(data.key));
  });
};
