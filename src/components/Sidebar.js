import React from 'react';
import uniqid from 'uniqid';

const Sidebar = ({ todos, current, onClick }) => {
  return (
    <div className="sidebar-container">
      <ul>
        {todos.map((item) => (
          <li
            onClick={onClick}
            className={current === item.list ? 'active' : ''}
            key={uniqid()}
          >
            {item.list}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
