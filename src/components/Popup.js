import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const Popup = ({ onClick, currentList }) => {
  const [title, setTitle] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title !== '') {
      try {
        await addDoc(collection(db, 'todos'), {
          title: title,
          completed: false,
          list: 'test',
        });
      } catch (e) {
        console.log(e);
      }

      setTitle('');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a task"
            value={title}
          />
          <div>
            <button onClick={onClick} type="submit">
              Submit
            </button>
            <button onClick={onClick}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Popup;
