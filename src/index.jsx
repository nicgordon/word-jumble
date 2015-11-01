import 'babel-core/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Application from './containers/application';
import configureStore from './store/configure-store';

// React components for Redux DevTools
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

const store = configureStore();

const devtools = __DEVTOOLS__ ? (
  <DebugPanel top right bottom>
    <DevTools store={store} monitor={LogMonitor} />
  </DebugPanel>
) : null;

ReactDOM.render((
  <div>
    <Provider store={store}>
      <Application />
    </Provider>
    {devtools}
  </div>
  ), document.getElementById('root')
);
