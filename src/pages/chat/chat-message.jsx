import React from 'react';
import { ListItemText, ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import cl from 'classnames';

const useStyles = makeStyles(theme => ({
  root: {
    padding: 0,
  },
  creator: {
    fontSize: theme.typography.pxToRem(13),
  },
  message: {
    wordWrap: 'break-word',
  },
  withEllipsis: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
}));

const ChatMessage = ({
  message: {
    message,
    from: { name },
  },
}) => {
  const classes = useStyles();
  return (
    <ListItem className={classes.root}>
      <ListItemText
        primary={message}
        primaryTypographyProps={{ className: classes.message, component: 'p' }}
        secondary={name}
        secondaryTypographyProps={{
          className: cl(classes.creator, classes.withEllipsis),
          component: 'p',
        }}
      />
    </ListItem>
  );
};

export default ChatMessage;
