import { actionPath } from '../../utils';

const get = actionPath('auth');

export const authActionNames = {
  USER_LOGGED_IN: get('USER_LOGGED_IN'),

  REGISTER_USER: get('REGISTER_USER'),
  REGISTER_USER_SUCCESS: get('REGISTER_USER_SUCCESS'),
  REGISTER_USER_ERROR: get('REGISTER_USER_ERROR'),

  LOG_IN_USER: get('LOG_IN_USER'),
  LOG_IN_USER_SUCCESS: get('LOG_IN_USER_SUCCESS'),
  LOG_IN_USER_ERROR: get('LOG_IN_USER_ERROR'),
};
