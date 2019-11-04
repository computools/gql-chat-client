import { call, takeLatest, put } from '@redux-saga/core/effects';
import { authActionNames } from '.';
import { FORM_ERROR } from 'final-form';
import api from '../../api';
import { authActions } from './actions';
import { ApiError } from '../../models/ApiError';

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
  } catch (err) {
    yield put(
      authActions.registerUserError({
        [FORM_ERROR]: ApiError.from(err).message,
      })
    );
  }
}

function* loginUser({ payload: { email, password } }) {
  try {
    const {
      data: {
        loginUser: { user, token },
      },
    } = yield call(api.loginUser, {
      variables: {
        credentials: {
          email,
          password,
        },
      },
    });

    yield put(authActions.userLoggedIn({ user, token }));
    yield put(authActions.logInUserSuccess());
  } catch (err) {
    yield put(
      authActions.logInUserError({
        [FORM_ERROR]: ApiError.from(err).message,
      })
    );
  }
}

export function* authWatcher() {
  yield takeLatest(authActionNames.REGISTER_USER, registerUser);
  yield takeLatest(authActionNames.LOG_IN_USER, loginUser);
}
