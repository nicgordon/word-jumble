import 'babel-polyfill';

import { render } from 'react-dom';
import configureStore from 'store/configure';
import React from 'react';

import Root from 'containers/root';

const initialState = window.__data;
const store = configureStore(initialState);
const rootElement = document.getElementById('content');

render(<Root store={store} />, rootElement);
