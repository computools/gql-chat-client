import React, { useEffect, useMemo, useCallback } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { subscriptions } from '../../api/subscriptions';
import ChatsGrid from './chats-grid';
import ChatsHeader from './chats-header';
import { Container } from '@material-ui/core';
import { Spacer, Loader } from '../../components/common';
import { GET_ALL_CHATS } from '../../api/query';
import { toMoment } from '../../utils';
import { chatListTypes } from '../../store/user-data';
import { useSelector } from 'react-redux'
import ChatsList from './chats-list';

// const SEND_MESSAGE = gql`
//   mutation SendMessage($message: String!) {
//     sendMessage(message: $message)
//   }
// `;

const chatsListTypeToComponent = {
  [chatListTypes.grid]: ChatsGrid,
  [chatListTypes.list]: ChatsList
}

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
  const chatListType = useSelector(state => state.userData.chatListType)
  const renderChats = useCallback(() => {
    const Component = chatsListTypeToComponent[chatListType]
    return <Component chats={chats} />
  }, [chats, chatListType])

  if (loading) return <Loader absolute />;
  if (error) return <span>Got an error</span>;

  return (
    <Container maxWidth="lg">
      <Spacer height={10} />
      <ChatsHeader />
      {renderChats()}
    </Container>
  );
};

export default ChatsPage;
