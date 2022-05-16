// import React, { useState } from 'react';
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
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';

export default function AddList({ onClick, currentList, choice }) {
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
      <IconButton onClick={handleClickOpen}>
        Add List
        <LibraryAddIcon sx={{ ml: 2 }} />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New List</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>Name your new list</DialogContentText> */}
          <TextField
            autoFocus
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
          <Button onClick={handleClose}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

// const Popup = ({ onClick, currentList, choice }) => {
//   const [title, setTitle] = useState('');
//   const { currentUser } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (choice === 'task') {
//       if (title !== '') {
//         try {
//           await addDoc(collection(db, 'users', currentUser.uid, 'todos'), {
//             title: title,
//             completed: false,
//             list: currentList.list,
//           });
//         } catch (e) {
//           console.log(e);
//         }
//         setTitle('');
//       }
//     } else {
//       if (title !== '') {
//         try {
//           await addDoc(collection(db, 'users', currentUser.uid, 'lists'), {
//             list: title,
//           });
//         } catch (e) {
//           console.log(e);
//         }
//         setTitle('');
//       }
//     }

//     onClick();
//   };

//   return (

//     <div className="modal-pop">
//       <div className="modal-content">
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder={`New ${choice}`}
//             value={title}
//           />
//           <div>
//             <button onClick={handleSubmit} type="submit">
//               Submit
//             </button>
//             <button type="button" onClick={onClick}>
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Popup;
