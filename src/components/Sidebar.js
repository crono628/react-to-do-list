import React, { useState, useEffect } from 'react';
import uniqid from 'uniqid';

const Sidebar = ({ todos, current, onClick }) => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const mapList = todos.map((item) => item.list);
    const filtered = todos.filter(
      ({ list }, index) => !mapList.includes(list, index + 1)
    );
    setLists(filtered);
  }, [todos]);

  return (
    <div className="sidebar-container">
      <ul>
        {lists.map((item) => (
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
