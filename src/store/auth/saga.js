import { delay, call, takeLatest, put, select } from '@redux-saga/core/effects';
import { authActionNames } from '.';
import { FORM_ERROR } from 'final-form';
import api from '../../api';
import { authActions } from './actions';
import { ApiError } from '../../models';
import { TOKEN_UPDATE_DELAY } from '../../constants';
import { shouldUpdateToken } from '../../utils';

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

function* verifyUserToken() {
  const token = yield select(state => state.auth.token);

  if (!token) {
    return yield put(authActions.verifyUserTokenSuccess());
  }

  try {
    const {
      data: {
        verifyUser: { user },
      },
    } = yield call(api.verifyUser, { variables: { token } });
    yield put(authActions.verifyUserTokenSuccess({ user }));
  } catch (err) {
    yield put(authActions.verifyUserTokenError());
  }
}

function* updateUserToken() {
  const token = yield select(state => state.auth.token);

  if (token && shouldUpdateToken(token)) {
    try {
      const {
        data: {
          updateUserToken: { token: newToken },
        },
      } = yield call(api.updateUserToken, { variables: { token } });
      yield put(authActions.updateUserTokenSuccess({ token: newToken }));
    } catch {}
  }

  yield delay(TOKEN_UPDATE_DELAY);
  yield put(authActions.updateUserToken());
}

export function* authWatcher() {
  yield takeLatest(authActionNames.REGISTER_USER, registerUser);
  yield takeLatest(authActionNames.LOG_IN_USER, loginUser);
  yield takeLatest(authActionNames.VERIFY_USER_TOKEN, verifyUserToken);
  yield takeLatest(authActionNames.UPDATE_USER_TOKEN, updateUserToken);
}
