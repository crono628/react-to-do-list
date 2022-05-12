import React from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Nav = ({ onAddList, onAddTask }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav>
      <div className="nav-left">To Do</div>
      <div className="d-flex align-items-center me-3">
        <div className="me-2">{currentUser.email}</div>
        <Button variant="outline-secondary" size="sm" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
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

// className="w-100 text-center mt-2"
