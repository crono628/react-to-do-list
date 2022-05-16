import { db } from '../firebase';
import { collection, addDoc, updateDoc, setDoc } from 'firebase/firestore';
import { useAuth } from './AuthContext';
import { Box, Container, IconButton, Modal } from '@mui/material';

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

export default function AddTask({ onClick, currentList, choice }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        Add Task <PlaylistAddIcon sx={{ ml: 2 }} />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Task</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>Name your new task</DialogContentText> */}
          <TextField
            autoFocus
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
          <Button onClick={handleClose}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
