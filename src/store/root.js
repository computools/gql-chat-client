import { authWatcher, authReducer } from './auth';
import { combineReducers } from 'redux';
import { all } from '@redux-saga/core/effects';

export const rootReducer = combineReducers({
  authReducer,
});

export function* rootSaga() {
  yield all([
    authWatcher(),
  ])
}