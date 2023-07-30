import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import { App } from 'renderer/App';

import { ElectronStorage } from 'helpers/storage';

import 'normalize.css';
import 'renderer/styles/main.scss';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(
  <MemoryRouter>
    <App />
  </MemoryRouter>
);

// Вызов IPC из preload-скрипта
ElectronStorage().once('ipc-example', (arg) => {
  // eslint-disable-next-line no-console
  console.log(arg);
});
ElectronStorage().sendMessage('ipc-example', ['ping']);
// ElectronStorage().sendMessage('save:user-data', {
//   key: 'userData',
//   value: { id: 0 }
// });
