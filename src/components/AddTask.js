import { db } from '../firebase';
import { collection, addDoc, updateDoc, setDoc } from 'firebase/firestore';
import { useAuth } from './AuthContext';
import {
  Box,
  Container,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
} from '@mui/material';

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

export default function AddTask({ currentList, choice }) {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const { currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'users', currentUser.uid, 'todos'), {
        title: title,
        completed: false,
        list: currentList.list,
      });
    } catch (e) {
      console.log(e);
    }
    setTitle('');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton onClick={handleClickOpen}>
          <ListItemText primary="Add Task" />
          <ListItemIcon>
            <PlaylistAddIcon sx={{ ml: 2 }} />
          </ListItemIcon>
        </ListItemButton>
      </ListItem>

      {currentList ? (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>New Task</DialogTitle>
          <form onSubmit={handleSubmit}>
            <DialogContent>
              {/* <DialogContentText>Name your new list</DialogContentText> */}
              <TextField
                autoFocus
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                margin="dense"
                id="name"
                label="Task Name"
                type="text"
                fullWidth
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" onClick={handleClose}>
                Add
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      ) : (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Choose a List'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              To add a new task, please select a list first.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
