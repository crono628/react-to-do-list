import React, { useState, useEffect } from 'react';
import Nav from './components/Nav';
import Sidebar from './components/Sidebar';
import mockData from './components/testing/mockData.js';

const App = () => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    setLists([...mockData]);
  }, []);

  const handleList = () => {};

  return (
    <div className="app">
      <Nav />
      <Sidebar lists={lists} onListClick={handleList} />
    </div>
  );
};

export default App;
