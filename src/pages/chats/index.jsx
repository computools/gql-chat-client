import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { subscriptions } from '../../api/subscriptions';
import ChatsList from './chats-list';
import ChatsHeader from './chats-header';
import { Container } from '@material-ui/core';
import { Spacer, Loader } from '../../components/common';
import { GET_ALL_CHATS } from '../../api/query';

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
      updateQuery: (prev, { subscriptionData: { data } }) => {
        const {
          chatList: { chat, type },
        } = data;
        switch (type) {
          case 'ADDED':
            return { ...prev, chats: [...prev.chats, chat] };
          default:
            return prev;
        }
      },
    });
  }, [subscribeToMore]);

  if (loading) return <Loader absolute />;
  if (error) return <span>Got an error</span>;

  return (
    <Container maxWidth="lg">
      <Spacer height={10} />
      <ChatsHeader />
      <ChatsList chats={data.chats} />
    </Container>
  );
};

export default ChatsPage;
