import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import { AccountCircle } from '@material-ui/icons';
import { useActions } from '../hooks';
import { authActions } from '../../store/auth';

const useStyles = makeStyles(theme => ({
  spacer: {
    paddingTop: theme.overrides.MuiToolbar.root.height,
  },
  title: {
    fontFamily: `Kalam,${theme.typography.fontFamily}`,
    fontSize: theme.typography.pxToRem(30),
    marginTop: '5px',
  },
  flexGrow: {
    flex: 1,
  },
}));

const actions = {
  logOutUser: authActions.logOutUser,
};

const Header = () => {
  const classes = useStyles();
  const { logOutUser } = useActions(actions);
  const isUserLoggedIn = useSelector(state => !!state.auth.user);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const isMenuOpen = !!menuAnchor;

  const setAnchor = e => setMenuAnchor(e.currentTarget);
  const handleMenuClick = fn => (...args) => {
    fn(...args);
    setMenuAnchor(null);
  };
  const hangleLogOut = handleMenuClick(logOutUser);

  return (
    <>
      <AppBar position="fixed" color="primary">
        <Toolbar variant="dense">
          <Typography variant="h5" className={classes.title}>
            QChat
          </Typography>
          <div className={classes.flexGrow}></div>
          {isUserLoggedIn && (
            <div>
              <IconButton color="inherit" onClick={setAnchor}>
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={menuAnchor}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={isMenuOpen}
                onClose={() => setMenuAnchor(null)}
              >
                <MenuItem onClick={hangleLogOut}>Log Out</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <div className={classes.spacer}></div>
    </>
  );
};

export default Header;
