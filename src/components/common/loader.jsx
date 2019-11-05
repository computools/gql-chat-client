import React from 'react';
import { CircularProgress } from '@material-ui/core';
import Centered from './centered';

const Loader = props => {
  return (
    <Centered>
      <CircularProgress color="primary" {...props} />
    </Centered>
  );
};

export default Loader;
