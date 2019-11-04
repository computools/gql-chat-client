import gql from 'graphql-tag';
import { baseNoCacheQuery } from './utils';

const LOGIN_USER = gql`
  query LoginUser($credentials: Credentials!) {
    loginUser(credentials: $credentials) {
      user {
        id
        name
        email
      }
      token
    }
  }
`;

export const query = {
  loginUser: baseNoCacheQuery(LOGIN_USER),
};
