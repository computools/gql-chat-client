import { authActionNames } from '.';

const init = {
  message: 'nope',
};

export function authReducer(state = init, action) {
  switch (action.type) {
    case authActionNames.LOG_IN_USER_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
      };
    default: return state;
  }
};
