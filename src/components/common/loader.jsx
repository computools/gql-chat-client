import React from 'react';
import { CircularProgress } from '@material-ui/core';
import Centered from './centered';

const Loader = ({ absolute, rest }) => {
  return (
    <Centered absolute={absolute}>
      <CircularProgress color="primary" {...rest} />
    </Centered>
  );
};

export default Loader;
