import React from 'react';
import { Paper, Typography, makeStyles } from '@material-ui/core';
import cl from 'classnames';
import ChatMenu from './chat-menu';

const useStyles = makeStyles(theme => ({
  listPaper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
  },
  chatName: {
    fontSize: theme.typography.pxToRem(18),
  },
  creatorName: {
    fontSize: theme.typography.pxToRem(13),
  },
  withEllipsis: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  nameAndCreatorContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
  },
  nameAndCreatorWrap: {
    overflow: 'hidden',
    flex: 1,
  },
}));

const ChatsGridItem = ({ chat }) => {
  const {
    createdAt,
    name,
    creator: { name: creatorName },
  } = chat;
  const classes = useStyles();

  return (
    <Paper className={classes.listPaper}>
      <div className={classes.nameAndCreatorContainer}>
        <div className={classes.nameAndCreatorWrap}>
          <Typography variant="h6" className={cl(classes.withEllipsis, classes.chatName)}>
            {name}
          </Typography>
          <Typography
            variant="body2"
            className={cl(classes.withEllipsis, classes.creatorName)}
          >
            Created by {creatorName}
          </Typography>
        </div>
        <ChatMenu chat={chat} />
      </div>
      <Typography variant="caption" className={classes.withEllipsis}>
        Created at {createdAt.format('YYYY-MM-DD HH:mm')}
      </Typography>
    </Paper>
  );
};

export default ChatsGridItem;
