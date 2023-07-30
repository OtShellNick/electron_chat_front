const storage = require('electron-json-storage');
const {ipcMain} = require('electron');

export type StorageTypes = 'save:user-data' | 'get:user-data';

export const ElectronStorage = (path: string) => {

  console.log('path', storage.getDefaultDataPath());

  ipcMain.on('get:user-data', (event, data) => {event.reply('get:user-data', storage.getSync(data.key))});

  ipcMain.on('save:user-data', (event, {key, value}) => storage.set(key, JSON.stringify(value)));
}
