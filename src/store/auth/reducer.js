import { authActionNames } from '.';

const init = {
  user: null,
  isUserLoaded: false,
  token: null,
};

export function authReducer(state = init, action) {
  switch (action.type) {
    case authActionNames.USER_LOGGED_IN:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };

    case authActionNames.VERIFY_USER_TOKEN_SUCCESS:
      return {
        ...state,
        isUserLoaded: true,
        user: action.payload.user || null,
      };
    // todo: show error if it's not related to the user token
    case authActionNames.VERIFY_USER_TOKEN_ERROR:
      return {
        ...state,
        isUserLoaded: true,
        token: null,
        user: null,
      };
    default:
      return state;
  }
}
