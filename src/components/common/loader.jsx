import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Loader = ({ ...rest }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress color="primary" {...rest} />
    </div>
  );
};

export default Loader;
