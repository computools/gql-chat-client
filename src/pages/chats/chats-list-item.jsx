import React, { useState } from 'react';
import {
  Paper,
  Typography,
  makeStyles,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
} from '@material-ui/core';
import cl from 'classnames';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useMenu } from '../../components/hooks';
import { useSelector } from 'react-redux';
import { DELETE_CHAT } from '../../api/mutations';
import { useMutation } from '@apollo/react-hooks';
import { Loader } from '../../components/common';
import { withSnackBar } from '../../contexts/snack-bar';
import { ApiError } from '../../models';

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
  deleteChatBtn: {
    backgroundColor: theme.palette.error.main,
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  },
  deleteChatDialog: {},
}));

const ChatsListItem = ({ chat, snackBar }) => {
  const {
    id,
    createdAt,
    name,
    creator: { name: creatorName, id: creatorId },
  } = chat;
  const classes = useStyles();
  const [isChatDeleteOpen, setIsChatDeleteOpen] = useState(false);
  const [deleteChat, { loading }] = useMutation(DELETE_CHAT, {
    onCompleted: ({ deleteChat }) => {
      if (deleteChat) {
        snackBar.success({ message: 'Chat has been deleted successfully' });
        return
      }
      snackBar.error({ message: 'Unable to delete chat' });
    },
    onError: err => {
      snackBar.error({ message: ApiError.from(err).message });
    },
  });
  const userId = useSelector(s => s.auth.user.id);
  const { isMenuOpened, onMenuClose, onMenuOpen, menuAnchor } = useMenu();
  const isCurrentUserChatCreator = userId === creatorId;
  const onChatDeleteDialogOpen = () => {
    setIsChatDeleteOpen(true);
    onMenuClose();
  };
  const onDeleteChatClick = () => {
    deleteChat({ variables: { chatId: id } });
  };

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
        {isCurrentUserChatCreator && (
          <>
            <IconButton onClick={onMenuOpen}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              anchorEl={menuAnchor}
              open={isMenuOpened}
              onClose={onMenuClose}
            >
              <MenuItem onClick={onChatDeleteDialogOpen}>Delete chat</MenuItem>
            </Menu>
          </>
        )}
        <Dialog
          className={classes.deleteChatDialog}
          open={isChatDeleteOpen}
          onClose={() => setIsChatDeleteOpen(false)}
          maxWidth={'xs'}
          fullWidth
          disableBackdropClick={loading}
          disableEscapeKeyDown={loading}
        >
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this chat?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              variant="outlined"
              onClick={() => setIsChatDeleteOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className={classes.deleteChatBtn}
              variant="contained"
              onClick={onDeleteChatClick}
            >
              Delete
            </Button>
          </DialogActions>
          {loading && <Loader dim absolute />}
        </Dialog>
      </div>
      <Typography variant="caption" className={classes.withEllipsis}>
        Created at {createdAt.format('YYYY-MM-DD HH:mm')}
      </Typography>
    </Paper>
  );
};

export default withSnackBar(ChatsListItem);
