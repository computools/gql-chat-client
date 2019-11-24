import React, { useEffect, useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { subscriptions } from '../../api/subscriptions';
import ChatsList from './chats-list';
import ChatsHeader from './chats-header';
import { Container } from '@material-ui/core';
import { Spacer, Loader } from '../../components/common';
import { GET_ALL_CHATS } from '../../api/query';
import { toMoment } from '../../utils';

// const SEND_MESSAGE = gql`
//   mutation SendMessage($message: String!) {
//     sendMessage(message: $message)
//   }
// `;

const ChatsPage = () => {
  const { data, loading, error, subscribeToMore } = useQuery(GET_ALL_CHATS);
  useEffect(() => {
    subscribeToMore({
      document: subscriptions.chatList,
      updateQuery: (
        prev,
        {
          subscriptionData: {
            data: { chatList },
          },
        }
      ) => {
        switch (chatList.type) {
          case 'ADDED':
            return { ...prev, chats: [...prev.chats, chatList.chat] };
          case 'DELETED':
            return {
              ...prev,
              chats: prev.chats.filter(({ id }) => id !== chatList.chatId),
            };
          default:
            return prev;
        }
      },
    });
  }, [subscribeToMore]);
  const chats = useMemo(() => {
    if (!data) return [];
    return data.chats.map(chat => ({
      ...chat,
      createdAt: toMoment(chat.createdAt),
    }));
  }, [data]);

  if (loading) return <Loader absolute />;
  if (error) return <span>Got an error</span>;

  return (
    <Container maxWidth="lg">
      <Spacer height={10} />
      <ChatsHeader />
      <ChatsList chats={chats} />
    </Container>
  );
};

export default ChatsPage;
