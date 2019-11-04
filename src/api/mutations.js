import gql from 'graphql-tag';
import { baseMutation } from './utils';
import { fragments } from './fragments';

const REGISTER_USER = gql`
  mutation registerUser($user: RegisterUserInput!) {
    registerUser(user: $user) {
      ...userWithToken
    }
  }

  ${fragments.userWithToken}
`;

export const mutations = {
  registerUser: baseMutation(REGISTER_USER),
};
