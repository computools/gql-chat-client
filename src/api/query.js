import gql from 'graphql-tag';
import { baseNoCacheQuery } from './utils';
import { fragments } from './fragments';

const LOGIN_USER = gql`
  query LoginUser($credentials: Credentials!) {
    loginUser(credentials: $credentials) {
      ...userWithToken
    }
  }

  ${fragments.userWithToken}
`;

const VERIFY_USER_TOKEN = gql`
  query VerifyUserToken($token: String!) {
    verifyUser(token: $token) {
      user {
        ...userWithoutPassword
      }
    }
  }

  ${fragments.userWithoutPassword}
`;

export const query = {
  loginUser: baseNoCacheQuery(LOGIN_USER),
  verifyUser: baseNoCacheQuery(VERIFY_USER_TOKEN),
};
