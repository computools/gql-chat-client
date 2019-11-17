import React from 'react';
import {
  GridList,
  GridListTile,
  Paper,
  Typography,
  makeStyles,
  withWidth,
  IconButton,
} from '@material-ui/core';
import cl from 'classnames';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles(theme => ({
  listTile: {
    overflow: 'visible',
  },
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

const widthToGridCols = {
  xs: 1,
  sm: 2,
  md: 4,
  lg: 5,
  xl: 5,
};

const ChatsList = ({ chats, width }) => {
  const classes = useStyles();
  return (
    <GridList cellHeight={150} spacing={12} cols={widthToGridCols[width]}>
      {chats.map(({ createdAt, name, id, creator: { name: creatorName } }) => {
        return (
          <GridListTile key={id} classes={{ tile: classes.listTile }}>
            <Paper className={classes.listPaper}>
              <div className={classes.nameAndCreatorContainer}>
                <div className={classes.nameAndCreatorWrap}>
                  <Typography
                    variant="h6"
                    className={cl(classes.withEllipsis, classes.chatName)}
                  >
                    {name}
                  </Typography>
                  <Typography
                    variant="body2"
                    className={cl(classes.withEllipsis, classes.creatorName)}
                  >
                    Created by {creatorName}
                  </Typography>
                </div>
                <IconButton onClick={() => {}}>
                  <MoreVertIcon />
                </IconButton>
              </div>
              <Typography variant="caption" className={classes.withEllipsis}>
                Created at {createdAt}
              </Typography>
            </Paper>
          </GridListTile>
        );
      })}
    </GridList>
  );
};

export default withWidth()(ChatsList);
