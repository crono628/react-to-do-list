import React from 'react';

const Sidebar = ({ lists, onListClick }) => {
  const renderLists = lists.map((list, index) => {
    return (
      <li onClick={onListClick} key={index}>
        {list.name}
      </li>
    );
  });

  return <ul className="sidebar-container">{renderLists}</ul>;
};

export default Sidebar;
