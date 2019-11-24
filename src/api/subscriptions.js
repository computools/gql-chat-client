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
      ... on ChatListChatAdded {
        type
        chat {
          ...chatWithoutMessages
        }
      }
      ... on ChatListChatDeleted {
        type
        chatId
      }
    }
  }

  ${fragments.chatWithoutMessages}
`;

export const subscriptions = {
  messageSent: MESSAGE_SENT,
  chatList: CHAT_LIST,
};
