import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import '@fortawesome/fontawesome-free/css/all.min.css';

import registerServiceWorker from './registerServiceWorker';
import configureStore from './redux/store/configureStore';

import App from './App';
import actions from './redux/actions';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
