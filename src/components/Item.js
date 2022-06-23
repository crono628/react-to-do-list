import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Container, IconButton, TextField } from '@mui/material';

import { db } from '../firebase';
import { updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { useAuth } from './AuthContext';

export default function Item({ todo }) {
  const [title, setTitle] = useState(todo.title);
  const [edit, setEdit] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {}, [todo.completed]);

  const handleComplete = async (todo) => {
    await updateDoc(doc(db, 'users', currentUser.uid, 'todos', todo.id), {
      completed: !todo.completed,
    });
  };

  const handleTitleEdit = async (e, todo) => {
    e.preventDefault();
    await updateDoc(doc(db, 'users', currentUser.uid, 'todos', todo.id), {
      title: title,
    });
  };

  const handleDelete = async (todo) => {
    await deleteDoc(doc(db, 'users', currentUser.uid, 'todos', todo.id));
  };

  const renderDisplay = (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        onClick={() => (edit ? setEdit(!edit) : !edit)}
        sx={{
          textDecoration: todo.completed ? 'line-through' : 'none',
          color: todo.completed ? 'red' : 'black',
        }}
      >
        <Typography sx={{ color: 'black' }}>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          backgroundColor: 'rgb(183, 246, 250)',
        }}
      >
        {edit ? (
          <Box
            component="form"
            onSubmit={(e) => {
              setEdit(!edit);
              handleTitleEdit(e, todo);
            }}
          >
            <TextField
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              margin="dense"
              id="name"
              // label="Task Name"
              type="text"
              fullWidth
              variant="standard"
              size="small"
            />
          </Box>
        ) : (
          <Container
            sx={{
              display: 'flex',
              justifyContent: 'space-evenly',
            }}
          >
            <IconButton onClick={() => handleComplete(todo)}>
              <CheckCircleIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                setEdit(!edit);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDelete(todo)}>
              <DeleteForeverIcon />
            </IconButton>
          </Container>
        )}
      </AccordionDetails>
    </Accordion>
  );
  return <>{renderDisplay}</>;
}
