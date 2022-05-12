import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, updateDoc, setDoc } from 'firebase/firestore';
import { useAuth } from './AuthContext';

const Popup = ({ onClick, currentList, choice }) => {
  const [title, setTitle] = useState('');
  const { currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (choice === 'task') {
      if (title !== '') {
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
      }
    } else {
      if (title !== '') {
        try {
          await addDoc(collection(db, 'users', currentUser.uid, 'lists'), {
            list: title,
          });
        } catch (e) {
          console.log(e);
        }
        setTitle('');
      }
    }

    onClick();
  };

  return (
    <div className="modal-pop">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            placeholder={`New ${choice}`}
            value={title}
          />
          <div>
            <button onClick={handleSubmit} type="submit">
              Submit
            </button>
            <button type="button" onClick={onClick}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Popup;
