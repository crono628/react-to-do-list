import React, { useState, useEffect } from 'react';
import Display from './components/Display';
import Nav from './components/Nav';
import Sidebar from './components/Sidebar';
import mockData from './components/testing/mockData.js';
import Popup from './Popup';

const App = () => {
  const [lists, setLists] = useState([]);
  const [current, setCurrent] = useState([]);
  const [input, setInput] = useState('');
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    setLists([...mockData]);
  }, []);

  const handleList = (e) => {
    let selectedList = lists.find((item) => item.name === e.target.textContent);
    setCurrent([selectedList]);
  };

  const handleAddList = () => {
    console.log('list');
    setPopup(!popup);
  };

  const handleAddTask = () => {
    console.log('task');
  };

  return (
    <div className="app">
      {popup ? <Popup onClick={() => setPopup(!popup)} name={'list'} /> : null}
      <Nav onAddList={handleAddList} onAddTask={handleAddTask} />
      <div className="main">
        <Sidebar current={current} lists={lists} onListClick={handleList} />
        <Display toDo={current} />
      </div>
    </div>
  );
};

export default App;
