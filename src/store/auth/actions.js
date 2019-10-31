import { authActionNames } from '.';

export const authActions = {
  logInUser: () => ({ type: authActionNames.LOG_IN_USER }),
  registerUser: ({ email, password, name }) => ({
    type: authActionNames.REGISTER_USER,
    payload: { email, password, name },
  }),
  registerUserSuccess: () => ({ type: authActionNames.REGISTER_USER_SUCCESS }),
  registerUserError: errors => ({
    type: authActionNames.REGISTER_USER_ERROR,
    payload: errors,
  }),
  userLoggedIn: ({ user, token }) => ({
    type: authActionNames.USER_LOGGED_IN,
    payload: { user, token },
  }),
};
