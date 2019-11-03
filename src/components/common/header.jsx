import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  spacer: {
    paddingTop: theme.overrides.MuiToolbar.root.height,
  },
  title: {
    fontFamily: `Kalam,${theme.typography.fontFamily}`,
    fontSize: theme.typography.pxToRem(30),
    marginTop: '5px',
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <>
      <AppBar position="fixed" color="primary">
        <Toolbar variant="dense">
          <Typography variant="h5" className={classes.title}>
            QChat
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.spacer}></div>
    </>
  );
};

export default Header;
