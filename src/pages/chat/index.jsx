import React, { useEffect, useMemo, useCallback } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { subscriptions } from '../../api/subscriptions';
import { Container, makeStyles } from '@material-ui/core';
import { Spacer, Loader } from '../../components/common';
import { CHAT_WITH_MESSAGES } from '../../api/query';
import { toMoment } from '../../utils';
import { chatListTypes } from '../../store/user-data';
import { useSelector } from 'react-redux';
import ChatMessages from './chat-messages';
import SendMessage from './send-message';
import { HEADER_HEIGHT } from '../../constants';

const useStyles = makeStyles({
  root: {
    height: `calc(100% - ${HEADER_HEIGHT})`,
  },
  messagesContainer: {
    height: `calc(100% - 10px)`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

const ChatPage = ({
  match: {
    params: { chatId },
  },
}) => {
  const classes = useStyles();
  const { data, loading, error, subscribeToMore } = useQuery(CHAT_WITH_MESSAGES, {
    variables: { chatId },
  });
  // useEffect(() => {
  //   subscribeToMore({
  //     document: subscriptions.chatList,
  //     updateQuery: (
  //       prev,
  //       {
  //         subscriptionData: {
  //           data: { chatList },
  //         },
  //       }
  //     ) => {
  //       const prevChatList = prev.chats.list;
  //       switch (chatList.type) {
  //         case 'ADDED':
  //           return mutateChatsList({ prev, list: [...prevChatList, chatList.chat] });
  //         case 'DELETED':
  //           return mutateChatsList({
  //             prev,
  //             list: prevChatList.filter(({ id }) => id !== chatList.chatId),
  //           });
  //         default:
  //           return prev;
  //       }
  //     },
  //   });
  // }, [subscribeToMore]);

  if (loading) return <Loader absolute />;
  if (error) return <span>Got an error</span>;

  return (
    <Container maxWidth="sm" className={classes.root}>
      <Spacer height={10} />
      <div className={classes.messagesContainer}>
        <ChatMessages messages={data.chats.messages} />
        <SendMessage chatId={chatId} />
      </div>
    </Container>
  );
};

export default ChatPage;
