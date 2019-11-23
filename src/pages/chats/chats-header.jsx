import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_CHAT } from '../../api/mutations';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Container,
  Button,
  makeStyles,
} from '@material-ui/core';
import { FormLine } from '../../components/form';
import { Loader } from '../../components/common';
import { withSnackBar } from '../../contexts/snack-bar';
import { ApiError } from '../../models';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1, 0, 1.4, 0),
  },
  dialog: {
    padding: theme.spacing(1, 0),
    position: 'relative',
  },
  createChatBtn: {
    marginLeft: theme.spacing(1),
    minWidth: '85px',
  },
}));

const ChatsHeader = ({ snackBar }) => {
  const classes = useStyles();
  const [createChat, { loading }] = useMutation(CREATE_CHAT);
  const [isCreateChatOpen, setIsCreateChatOpen] = useState(false);
  const [chatCreateName, setChatCreateName] = useState('');
  const onChatCreate = async () => {
    if (!chatCreateName.length) {
      return snackBar.error({
        message: 'Chat name should be longer than one symbol',
      });
    }

    try {
      await createChat({
        variables: { chatSettings: { name: chatCreateName } },
      });
      setChatCreateName('');
      setIsCreateChatOpen(false);
      snackBar.success({ message: 'Chat has been created successfully' });
    } catch (err) {
      snackBar.error({
        message: ApiError.from(err).message,
      });
    }
  };

  return (
    <Container className={classes.root}>
      <Button
        color="primary"
        variant="outlined"
        onClick={() => setIsCreateChatOpen(true)}
      >
        Create chat
      </Button>
      <Dialog
        classes={{ paper: classes.dialog }}
        open={isCreateChatOpen}
        onClose={() => setIsCreateChatOpen(false)}
        maxWidth={'xs'}
        fullWidth
        disableBackdropClick={loading}
        disableEscapeKeyDown={loading}
      >
        <DialogTitle>Create a new chat</DialogTitle>
        <DialogContent>
          <FormLine>
            <TextField
              type="text"
              label="Chat name"
              autoFocus
              onChange={({ target: { value } }) => setChatCreateName(value)}
              fullWidth
              minLength="1"
            />
            <Button
              className={classes.createChatBtn}
              color="primary"
              variant="outlined"
              onClick={onChatCreate}
            >
              Create
            </Button>
          </FormLine>
          {loading && <Loader absolute dim />}
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default withSnackBar(ChatsHeader);
