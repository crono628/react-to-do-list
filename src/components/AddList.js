// import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, updateDoc, setDoc } from 'firebase/firestore';
import { useAuth } from './AuthContext';
import {
  Box,
  Container,
  IconButton,
  List,
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
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';

export default function AddList({ onClick, currentList, choice }) {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const { currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'users', currentUser.uid, 'lists'), {
        list: title,
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
          <ListItemText primary="Add List" />
          <ListItemIcon>
            <LibraryAddIcon sx={{ ml: 2 }} />
          </ListItemIcon>
        </ListItemButton>
      </ListItem>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New List</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            {/* <DialogContentText>Name your new list</DialogContentText> */}
            <TextField
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              margin="dense"
              id="name"
              label="List Name"
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
    </>
  );
}
