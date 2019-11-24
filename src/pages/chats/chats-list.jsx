import React from 'react';
import { GridList, withWidth, GridListTile, makeStyles } from '@material-ui/core';
import ChatsListItem from './chats-list-item';

const widthToGridCols = {
  xs: 1,
  sm: 2,
  md: 4,
  lg: 5,
  xl: 5,
};

const useStyles = makeStyles({
  listTile: {
    overflow: 'visible',
  },
});

const ChatsList = ({ chats, width }) => {
  const classes = useStyles();

  return (
    <GridList cellHeight={150} spacing={12} cols={widthToGridCols[width]}>
      {chats.map(chat => (
        <GridListTile key={`chat-${chat.id}`} classes={{ tile: classes.listTile }}>
          <ChatsListItem chat={chat} />
        </GridListTile>
      ))}
    </GridList>
  );
};

export default withWidth()(ChatsList);
