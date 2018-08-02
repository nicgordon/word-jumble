import 'babel-polyfill';

import { render } from 'react-dom';
import configureStore from 'store/configure';
import React from 'react';

// Connect to the game server
import socket from './lib/socket-io';

socket.on('chat message', (message) => {
  console.log('received:', message);
})

import Root from 'containers/root';

const initialState = window.__data;
const store = configureStore(initialState);
const rootElement = document.getElementById('content');

render(<Root store={store} />, rootElement);

