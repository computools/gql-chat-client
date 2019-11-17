import React from 'react';
import { useQuery } from '@apollo/react-hooks';
// import { subscriptions } from '../../api/subscriptions';
import gql from 'graphql-tag';
import ChatsList from './chats-list';
import { Container } from '@material-ui/core';
import { Spacer, Loader } from '../../components/common';

// const SEND_MESSAGE = gql`
//   mutation SendMessage($message: String!) {
//     sendMessage(message: $message)
//   }
// `;

const GET_ALL_CHATS = gql`
  query GetAllChats {
    chats {
      chats {
        name
        id
        createdAt
        creator {
          name
        }
      }
    }
  }
`;

const ChatsPage = () => {
  // const [sendMessage] = useMutation(SEND_MESSAGE);
  // const [message, setMessage] = useState('');
  // const [list, setList] = useState([]);
  // useSubscription(subscriptions.messageSent, {
  //   fetchPolicy: 'network-only',
  //   onSubscriptionData: ({ subscriptionData }) =>
  //     setList(prevState => [...prevState, subscriptionData.data.messageSent]),
  // });
  const { data, loading, error } = useQuery(GET_ALL_CHATS);

  if (loading) return <Loader absolute />;
  if (error) return <span>Got an error</span>;

  return (
    <Container maxWidth="lg">
      <Spacer height={10} />
      <ChatsList chats={data.chats.chats} />
    </Container>
  );
};

export default ChatsPage;
