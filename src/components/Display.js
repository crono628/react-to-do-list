import React, { useState } from 'react';
import uniqid from 'uniqid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Display = ({
  todo,
  handleDelete,
  handleComplete,
  handleSubmit,
  index,
}) => {
  const [title, setTitle] = useState(todo.title);
  const [edit, setEdit] = useState(null);

  const handleChange = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  const handleEdit = (i) => {
    edit === null ? setEdit(i) : setEdit(null);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setTitle(title);
  //   setEdit(null);
  // };

  const renderDisplay = (
    <div className="list-item" key={uniqid()}>
      <div
        className="list-title"
        style={{
          color: todo.completed && 'red',
          textDecoration: todo.completed && 'line-through',
        }}
      >
        {edit === index && (
          <form
            onSubmit={(e) => {
              handleSubmit(e, todo, title);
              handleEdit(index);
            }}
          >
            <input autoFocus onChange={handleChange} value={title} />
          </form>
        )}
        <span style={{ color: 'black' }}>{edit !== index && title}</span>
      </div>
      <div className="list-buttons">
        <button onClick={() => handleComplete(todo)}>
          <CheckCircleIcon />
        </button>
        <button
          onClick={(e) => {
            edit === index
              ? handleSubmit(e, todo, title) && handleEdit(index)
              : handleEdit(index);
          }}
        >
          <EditIcon />
        </button>
        <button onClick={() => handleDelete(todo.id)}>
          <DeleteForeverIcon />
        </button>
      </div>
    </div>
  );

  return <>{renderDisplay}</>;
};

export default Display;
