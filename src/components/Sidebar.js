import React from 'react';

const Sidebar = ({ lists, onListClick, current }) => {
  const currentName = current.map((item) => item.name);
  const renderLists = lists.map((list, index) => {
    return (
      <li
        className={currentName[0] === list.name ? 'active' : ''}
        onClick={onListClick}
        key={index}
      >
        {list.name}
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
