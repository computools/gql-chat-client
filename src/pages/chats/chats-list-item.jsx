import React from 'react';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  makeStyles,
} from '@material-ui/core';
import ChatMenu from './chat-menu';

const useStyles = makeStyles({
  withEllipsis: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
});

const ChatsListItem = ({ chat }) => {
  const {
    name,
    creator: { name: creatorName },
  } = chat;
  const classes = useStyles();
  const itemTextNestedProps = { className: classes.withEllipsis, component: 'p' };

  return (
    <ListItem>
      <ListItemText
        primary={name}
        primaryTypographyProps={itemTextNestedProps}
        secondary={`Created by ${creatorName}`}
        secondaryTypographyProps={itemTextNestedProps}
      />
      <ListItemSecondaryAction>
        <ChatMenu chat={chat} iconButtonProps={{ edge: 'end' }} />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default ChatsListItem;
