import gql from 'graphql-tag';
import { fragments } from './fragments';

const MESSAGE_SENT = gql`
  subscription messageSent {
    messageSent {
      id
      message
    }
  }
`;

const CHAT_LIST = gql`
  subscription chatList {
    chatList {
      type
      chat {
        ...chatWithoutMessages
      }
    }
  }

  ${fragments.chatWithoutMessages}
`;

export const subscriptions = {
  messageSent: MESSAGE_SENT,
  chatList: CHAT_LIST,
};
