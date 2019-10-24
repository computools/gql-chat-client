import React from 'react';
import { connect } from 'react-redux';
import { authActions } from '../../store/auth';

const SignUp = (props) => {
  const { logInUser, state } = props;
  return (
    <div>
      <button onClick={logInUser}>click</button>
      <div>{JSON.stringify(state)}</div>
    </div>
  );
};

export default connect(
  state => ({ state }),
  { ...authActions }
)(SignUp);
