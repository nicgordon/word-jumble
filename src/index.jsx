import 'babel-core/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Application from './containers/application';
import configureStore from './store/configure-store';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Application />
  </Provider>,
  document.getElementById('root')
);
