import React from 'react';
import { makeStyles } from '@material-ui/styles';
import cl from 'classnames';

const useStyles = makeStyles({
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Centered = ({ children, ...rest }) => {
  const classes = useStyles();
  return (
    <div {...rest} className={cl(classes.root, rest.className)}>
      {children}
    </div>
  );
};

export default Centered;
