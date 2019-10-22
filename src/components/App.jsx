import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authActions } from '../store/auth';

class App extends Component {
  render() {
    const { logInUser, state } = this.props;
    return (
      <>
        <button onClick={logInUser}>click</button>
        <div>{JSON.stringify(state)}</div>
      </>
    );
  }
}

export default connect(
  state => ({ state }),
  { ...authActions }
)(App);
