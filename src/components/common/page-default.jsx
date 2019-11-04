import React from 'react';
import { Header } from '.';
import { Container } from '@material-ui/core';

const PageDefault = ({ children }) => {
  return (
    <>
      <Header />
      <Container maxWidth="sm">{children}</Container>
    </>
  );
};

export default PageDefault;
