import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer, rootSaga } from './root-elements';

const sagaMiddleware = createSagaMiddleware();
const middlewares = composeWithDevTools(applyMiddleware(sagaMiddleware));
const store = createStore(
  rootReducer,
  middlewares
);
sagaMiddleware.run(rootSaga);

export default store;