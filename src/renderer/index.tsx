import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { App } from 'renderer/App';
import { store } from 'store/store';

import 'normalize.css';
import 'renderer/styles/main.scss';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(
  <MemoryRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </MemoryRouter>
);
