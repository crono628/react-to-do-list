import React from 'react';

const Sidebar = ({ lists, onListClick, current }) => {
  // returns tallied names of task lists as an object
  const reduceListNames = (obj) => {
    let reducer = obj.reduce((a, b) => {
      if (!a[b.list]) {
        a[b.list] = 0;
      }
      a[b.list]++;
      return a;
    }, {});
    return Object.keys(reducer);
  };

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
