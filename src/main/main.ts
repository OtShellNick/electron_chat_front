/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * Модуль, выполняющийся в основном процессе Electron. Вы можете запускать
 * процесс рендеринга Electron отсюда и общаться с другими процессами через IPC.
 *
 * При запуске `npm run build` или `npm run build:main`, этот файл компилируется в
 * `./src/main.js` с использованием webpack. Это дает нам некоторые выигрыши в производительности.
 */

 import path from 'path';
 import { app, BrowserWindow, shell, ipcMain } from 'electron';
 import { autoUpdater } from 'electron-updater';
 import log from 'electron-log';
 import MenuBuilder from './menu';
 import { resolveHtmlPath } from './util';
 import { ElectronStorage } from './storage';

 /**
  * Класс для обновления приложения.
  */
 class AppUpdater {
   constructor() {
     log.transports.file.level = 'info';
     autoUpdater.logger = log;
     autoUpdater.checkForUpdatesAndNotify();
   }
 }

 /** Основное окно приложения */
 let mainWindow: BrowserWindow | null = null;

 /** Обработчик IPC-сообщений */
 ipcMain.on('ipc-example', async (event, arg) => {
   const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
   console.log(msgTemplate(arg));
   event.reply('ipc-example', msgTemplate('pong'));
 });

 /** Установка source-map-support для production-сборки */
 if (process.env.NODE_ENV === 'production') {
   const sourceMapSupport = require('source-map-support');
   sourceMapSupport.install();
 }

 /** Флаг отладочного режима */
 const isDebug =
   process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

 /** Установка расширений разработчика */
 const installExtensions = async () => {
   const installer = require('electron-devtools-installer');
   const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
   const extensions = ['REACT_DEVELOPER_TOOLS'];

   return installer
     .default(
       extensions.map((name) => installer[name]),
       forceDownload
     )
     .catch(console.log);
 };

 /** Создание основного окна */
 const createWindow = async () => {
   if (isDebug) {
     await installExtensions();
   }

   const RESOURCES_PATH = app.isPackaged
     ? path.join(process.resourcesPath, 'assets')
     : path.join(__dirname, '../../assets');

   const getAssetPath = (...paths: string[]): string => {
     return path.join(RESOURCES_PATH, ...paths);
   };

   mainWindow = new BrowserWindow({
     show: false,
     width: 1024,
     height: 728,
     icon: getAssetPath('icon.png'),
     webPreferences: {
       preload: app.isPackaged
         ? path.join(__dirname, 'preload.js')
         : path.join(__dirname, '../../.erb/dll/preload.js'),
     },
   });

   mainWindow.loadURL(resolveHtmlPath('index.html'));

   mainWindow.on('ready-to-show', () => {
     if (!mainWindow) {
       throw new Error('"mainWindow" is not defined');
     }
     if (process.env.START_MINIMIZED) {
       mainWindow.minimize();
     } else {
       mainWindow.show();
     }
   });

   mainWindow.on('closed', () => {
     mainWindow = null;
   });

   const menuBuilder = new MenuBuilder(mainWindow);
   menuBuilder.buildMenu();

     // Открытие ссылок в браузере пользователя
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Удаление этого блока, если ваше приложение не использует автообновления
  new AppUpdater();
};

const getSettings = () => {
  const path = app.getPath('userData');
  ElectronStorage(path);
}

/**
 * Добавление обработчиков событий...
 */

app.on('window-all-closed', () => {
  // Уважение принятых в macOS правил оставления приложения в памяти,
  // даже после закрытия всех окон
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    getSettings();
    app.on('activate', () => {
      // В macOS обычно принято создавать новое окно приложения,
      // когда пользователь щелкает на иконку док-станции и нет других открытых окон.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);

