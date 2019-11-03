import React from 'react';
import { Container } from '@material-ui/core';
import SignUpForm from './sign-up-form';
import Header from '../../components/common/header';

const SignUpPage = () => {
  return (
    <>
      <Header />
      <Container maxWidth="sm">
        <SignUpForm />
      </Container>
    </>
  );
};

export default SignUpPage;
