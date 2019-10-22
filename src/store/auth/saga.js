import { takeLatest, put } from '@redux-saga/core/effects';
import { authActionNames } from '.';

function* loginUser() {
  yield put({ type: authActionNames.LOG_IN_USER_SUCCESS, payload: { message: 'LOGGED IN!' } });
}

export function* authWatcher() {
  yield takeLatest(authActionNames.LOG_IN_USER, loginUser);
}
