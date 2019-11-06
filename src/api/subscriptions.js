import gql from 'graphql-tag';

const MESSAGE_SENT = gql`
  subscription messageSent {
    messageSent {
      id
      message
    }
  }
`;

export const subscriptions = {
  messageSent: MESSAGE_SENT,
}