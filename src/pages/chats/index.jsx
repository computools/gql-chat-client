import React, { useState } from 'react';
import { useSubscription, useMutation } from '@apollo/react-hooks';
import { subscriptions } from '../../api/subscriptions';
import gql from 'graphql-tag';

const SEND_MESSAGE = gql`
  mutation SendMessage($message: String!) {
    sendMessage(message: $message)
  }
`;

const ChatsPage = () => {
  const [sendMessage] = useMutation(SEND_MESSAGE);
  const [message, setMessage] = useState('');
  const [list, setList] = useState([]);
  useSubscription(subscriptions.messageSent, {
    fetchPolicy: 'network-only',
    onSubscriptionData: ({ subscriptionData }) =>
      setList(prevState => [...prevState, subscriptionData.data.messageSent]),
  });

  return (
    <div>
      <button onClick={() => sendMessage({ variables: { message: message } })}>
        SEND!
      </button>
      <input value={message} onChange={e => setMessage(e.target.value)} />
      {!!list.length && <div>MESSAGES:</div>}
      <div>
        {list.map(v => (
          <div key={v.id}>{v.message}</div>
        ))}
      </div>
    </div>
  );
};

export default ChatsPage;
