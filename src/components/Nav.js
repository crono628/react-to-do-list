import React from 'react';

const Nav = ({ onAddList, onAddTask }) => {
  return (
    <nav>
      <div className="nav-left">To Do</div>
      <div className="nav-right">
        <div onClick={onAddList}>Add List</div>
        <div onClick={onAddTask}>Add Task</div>
      </div>
    </nav>
  );
};

export default Nav;
