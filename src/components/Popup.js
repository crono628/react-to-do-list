import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const Popup = ({ onClick, currentList, choice }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (choice === 'task') {
      if (title !== '') {
        try {
          await addDoc(collection(db, 'todos'), {
            title: title,
            completed: false,
            list: currentList,
          });
        } catch (e) {
          console.log(e);
        }
        setTitle('');
      }
    } else {
      if (title !== '') {
        try {
          await addDoc(collection(db, 'todos'), {
            title: null,
            completed: false,
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
    <div className="modal">
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
