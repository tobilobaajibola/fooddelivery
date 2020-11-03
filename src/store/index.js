import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import {composeWithDevTools} from 'remote-redux-devtools';
import logger from 'redux-logger';
import reducers from './reducers/index';

let middleware = [ReduxThunk];
if (__DEV__) {
  middleware = [ReduxThunk, logger];
}

const store = createStore(
  reducers,
  {},
  composeWithDevTools(applyMiddleware(...middleware)),
);

if (module.hot) {
  module.hot.accept(() => {
    const nextRootReducer = require('./reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
