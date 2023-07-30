// Отключение правила no-unused-vars, которое не работает для аргументов через spread
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { StorageTypes } from './storage';

export type Channels = 'ipc-example' | StorageTypes;

/**
 * Обработчик Electron для взаимодействия с основным процессом через IPC.
 */
const electronHandler = {
  ipcRenderer: {
    /**
     * Отправка сообщения через IPC.
     * @param channel - Канал сообщения.
     * @param args - Аргументы сообщения.
     */
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    /**
     * Регистрация обработчика для получения сообщений через IPC.
     * @param channel - Канал сообщения.
     * @param func - Функция-обработчик.
     * @returns Функция для отмены регистрации обработчика.
     */
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    /**
     * Регистрация одноразового обработчика для получения сообщения через IPC.
     * @param channel - Канал сообщения.
     * @param func - Функция-обработчик.
     */
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
};

// Экспорт обработчика Electron в глобальный контекст окна
contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
