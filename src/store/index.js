import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootReducer, rootSaga } from './root';

const sagaMiddleware = createSagaMiddleware();
const middlewares = applyMiddleware(sagaMiddleware);
const store = createStore(
  rootReducer,
  middlewares
);
sagaMiddleware.run(rootSaga);

export default store;