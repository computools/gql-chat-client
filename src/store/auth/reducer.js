import { authActionNames } from '.';

const init = {
  user: null,
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
    default: return state;
  }
};
