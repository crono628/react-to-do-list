import React from 'react';
import uniqid from 'uniqid';
import FolderDeleteIcon from '@mui/icons-material/FolderDelete';

const Sidebar = ({ todos, current, onClick, handleDeleteList }) => {
  const deleteWarning = () => {
    let text;
    if (
      window.confirm(
        'Are you sure you want to delete this list and all of its contents?'
      ) === true
    ) {
      text = 'List and contents deleted';
      handleDeleteList(current.list);
    } else {
      text = 'List not deleted';
    }
  };

  return (
    <div className="sidebar-container">
      <div className="delete-btn-container">
        {current.list ? (
          <button onClick={deleteWarning} className="delete-btn">
            <FolderDeleteIcon />
          </button>
        ) : null}
      </div>
      <div className="list-container">
        <ul>
          {todos.map((item) => (
            <li
              onClick={onClick}
              className={current.list === item.list ? 'active' : ''}
              key={uniqid()}
            >
              {item.list}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
