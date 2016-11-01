import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '../reducers';

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(
      thunkMiddleware
    ),
    window.devToolsExtension ? window.devToolsExtension() : (pass) => pass
  ));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
