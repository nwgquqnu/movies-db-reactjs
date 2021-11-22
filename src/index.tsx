import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { appVersion, mode } from './globals';

console.log(`Current version ${appVersion} in mode ${mode}`);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
