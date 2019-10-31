import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import { rootReducer, rootSaga } from './root-elements';
import createReduxPromiseListener from 'redux-promise-listener';

const logger = createLogger({ collapsed: true });
const reduxPromiseListener = createReduxPromiseListener();
const sagaMiddleware = createSagaMiddleware();

const middlewares = [logger, reduxPromiseListener.middleware, sagaMiddleware];
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);
sagaMiddleware.run(rootSaga);

export const promiseListener = reduxPromiseListener;
export default store;
