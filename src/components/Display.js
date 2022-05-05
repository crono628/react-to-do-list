import React, { useState, useEffect } from 'react';
import uniqid from 'uniqid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Display = ({ todos, current, onDelete, onEdit, onComplete }) => {
  const [title, setTitle] = useState([]);
  const [edit, setEdit] = useState(null);

  useEffect(() => {}, [todos, edit]);

  // const handleChange = (e) => {
  //   e.preventDefault();
  //   if (toDo.completed) {
  //     setTitle(toDo.title);
  //   } else {
  //     toDo.title = '';
  //     setTitle(e.target.value);
  //   }
  // };

  const handleEdit = (i) => {
    if (edit === null) {
      return setEdit(i);
    } else {
      setEdit(null);
    }
  };

  return (
    <div className="display">
      {todos
        .filter((data) => data.title && data.list === current)
        .map((item, index) => {
          return (
            <div className="list-item" key={uniqid()}>
              <div
                className="list-title"
                style={{ textDecoration: item.completed && 'line-through' }}
              >
                {edit === index ? <input /> : item.title}
              </div>
              <div className="list-buttons">
                <button>
                  <CheckCircleIcon />
                </button>
                <button onClick={() => handleEdit(index)}>
                  <EditIcon />
                </button>
                <button>
                  <DeleteForeverIcon />
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Display;
