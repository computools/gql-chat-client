import { call, takeLatest, put } from '@redux-saga/core/effects';
import { authActionNames } from '.';
import { FORM_ERROR } from 'final-form';
import api from '../../api';
import { authActions } from './actions';

function* registerUser({ payload: { email, password, name } }) {
  try {
    const {
      data: {
        registerUser: { user, token },
      },
    } = yield call(api.registerUser, {
      variables: {
        user: {
          email,
          password,
          name,
        },
      },
    });

    yield put(authActions.userLoggedIn({ user, token }));
    yield put(authActions.registerUserSuccess());
  } catch (error) {
    yield put(authActions.registerUserError({ [FORM_ERROR]: 'Got an error :/' }));
  }
}

export function* authWatcher() {
  yield takeLatest(authActionNames.REGISTER_USER, registerUser);
}
