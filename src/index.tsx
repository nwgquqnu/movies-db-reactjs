import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { appVersion, mode } from './globals';
import { store } from './store/store';
import { Provider } from 'react-redux';

console.log(`Current version ${appVersion} in mode ${mode}`);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
