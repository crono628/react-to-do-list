import React from 'react';
import uniqid from 'uniqid';
import FolderDeleteIcon from '@mui/icons-material/FolderDelete';

const Sidebar = ({ todos, current, onClick, handleDeleteList }) => {
  return (
    <div className="sidebar-container">
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
      <div>
        {current.list ? (
          <button
            onClick={() => handleDeleteList(current.list)}
            className="delete-btn-container"
          >
            <FolderDeleteIcon />
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Sidebar;
