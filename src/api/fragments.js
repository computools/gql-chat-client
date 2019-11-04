import gql from 'graphql-tag';

const USER_WITHOUT_PASSWORD = gql`
  fragment userWithoutPassword on UserWithoutPassword {
    id
    name
    email
  }
`;

const USER_WITH_TOKEN = gql`
  fragment userWithToken on UserWithToken {
    user {
      ...userWithoutPassword
    }
    token
  }

  ${USER_WITHOUT_PASSWORD}
`;

export const fragments = {
  userWithoutPassword: USER_WITHOUT_PASSWORD,
  userWithToken: USER_WITH_TOKEN,
};
