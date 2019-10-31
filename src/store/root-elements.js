import { authWatcher, authReducer } from './auth';
import { combineReducers } from 'redux';
import { all } from '@redux-saga/core/effects';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistAuthReducerConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};
export const rootReducer = combineReducers({
  auth: persistReducer(persistAuthReducerConfig, authReducer),
});

export function* rootSaga() {
  yield all([
    authWatcher(),
  ])
}