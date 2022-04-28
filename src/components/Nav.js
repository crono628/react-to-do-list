import React from 'react';

const Nav = ({ onAddList, onAddTask }) => {
  return (
    <nav>
      <div className="nav-left">To Do</div>
      <div className="nav-right">
        <div id="list" onClick={onAddList}>
          Add List
        </div>
        <div id="task" onClick={onAddTask}>
          Add Task
        </div>
      </div>
    </nav>
  );
};

export default Nav;
