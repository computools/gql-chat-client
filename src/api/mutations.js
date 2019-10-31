import gql from 'graphql-tag';
import { baseMutation } from './utils';

const REGISTER_USER = gql`
  mutation registerUser($user: RegisterUserInput!) {
    registerUser(user: $user) {
      user {
        id
        name
        email
      }
      token
    }
  }
`;

export const mutations = {
  registerUser: baseMutation(REGISTER_USER),
};
