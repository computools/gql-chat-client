import { withActionPath } from '../../utils';

export const authActionNames = withActionPath('auth', {
  LOG_IN_USER: 'LOG_IN_USER',
  LOG_IN_USER_SUCCESS: 'LOG_IN_USER_SUCCESS',
});