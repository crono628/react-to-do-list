import React, { useState, useEffect } from 'react';

const Sidebar = ({ lists, current, onClick }) => {
  const [sideLists, setSidelLists] = useState([]);

  useEffect(() => {
    const mapList = lists.map((item) => item.list);
    const filtered = lists.filter(
      ({ list }, index) => !mapList.includes(list, index + 1)
    );

    setSidelLists(filtered);
    console.log('sidebar updated');
  }, [lists]);

  return (
    <div className="sidebar-container">
      <ul>
        {sideLists.map((item) => (
          <li
            onClick={onClick}
            className={current === item.list ? 'active' : ''}
            key={item.task}
          >
            {item.list}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
