import React from 'react';

const Sidebar = ({ lists, onListClick, current }) => {
  const compareCurrent = current.map((item) => item.list);

  const renderLists = lists.map((item, index) => {
    return (
      <li
        className={compareCurrent[0] === item ? 'active' : ''}
        onClick={onListClick}
        key={index}
      >
        {item}
      </li>
    );
  });

  return (
    <div className="sidebar-container">
      <ul>{renderLists}</ul>
    </div>
  );
};

export default Sidebar;
