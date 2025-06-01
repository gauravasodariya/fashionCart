import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import './index.css';
import App from './App';

if (typeof window !== 'undefined') {
  window.toast = {
    success: (...args) => console.log('[toast.success]', ...args),
    error: (...args) => console.error('[toast.error]', ...args),
    info: (...args) => console.log('[toast.info]', ...args),
    warn: (...args) => console.warn('[toast.warn]', ...args),
  };
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
