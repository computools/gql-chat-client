import React, { useState, useCallback } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import { AccountCircle } from '@material-ui/icons';
import { useActions } from '../hooks';
import { authActions } from '../../store/auth';
import { useHistory } from 'react-router-dom';
import { routes } from '../../constants';

const useStyles = makeStyles(theme => ({
  spacer: {
    paddingTop: theme.overrides.MuiToolbar.root.height,
  },
  title: {
    fontFamily: `Kalam,${theme.typography.fontFamily}`,
    fontSize: theme.typography.pxToRem(30),
    marginTop: '5px',
    userSelect: 'none',
  },
  flexGrow: {
    flex: 1,
  },
  button: {
    color: '#fff',
    '&:last-child': {
      marginLeft: '10px',
    },
  },
}));

const actions = {
  logOutUser: authActions.logOutUser,
};

const Header = () => {
  const classes = useStyles();
  const history = useHistory();
  const { logOutUser } = useActions(actions);
  const isUserLoggedIn = useSelector(state => !!state.auth.user);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const isMenuOpen = !!menuAnchor;

  const onMenuOpen = useCallback(e => setMenuAnchor(e.currentTarget), []);
  const onMenuClose = useCallback(() => setMenuAnchor(null), []);
  const handleMenuItemClick = fn => (...args) => {
    fn(...args);
    onMenuClose();
  };
  const hangleLogOut = useCallback(handleMenuItemClick(logOutUser), [logOutUser]);
  const onLoginClick = useCallback(() => {
    history.push(routes.login);
  }, [history]);
  const onSignUpClick = useCallback(() => {
    history.push(routes.signup);
  }, [history]);

  return (
    <>
      <AppBar position="fixed" color="primary">
        <Toolbar variant="dense">
          <Typography variant="h5" className={classes.title}>
            QChat
          </Typography>
          <div className={classes.flexGrow}></div>
          {isUserLoggedIn ? (
            <div>
              <IconButton color="inherit" onClick={onMenuOpen}>
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
                onClose={onMenuClose}
              >
                <MenuItem onClick={hangleLogOut}>Log Out</MenuItem>
              </Menu>
            </div>
          ) : (
            <div>
              <Button
                variant="outlined"
                onClick={onSignUpClick}
                className={classes.button}
              >
                Sign up
              </Button>
              <Button
                variant="outlined"
                onClick={onLoginClick}
                className={classes.button}
              >
                Login
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <div className={classes.spacer}></div>
    </>
  );
};

export default Header;
