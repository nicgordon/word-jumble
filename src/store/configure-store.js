import { compose, createStore } from 'redux'
import rootReducer from '../reducers'

// Redux DevTools store enhancers
import { devTools, persistState } from 'redux-devtools';

export default function configureStore(initialState) {
  const finalCreateStore = compose(
    // Provides support for DevTools:
    devTools(),
    // Lets you write ?debug_session=<name> in address bar to persist debug sessions
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )(createStore);

  const store = finalCreateStore(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
