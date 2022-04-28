import React, { useState, useEffect } from 'react';
import Display from './components/Display';
import Nav from './components/Nav';
import Sidebar from './components/Sidebar';
import mockData from './components/testing/mockData.js';
import Popup from './components/Popup';

const App = () => {
  const [tasks, setTasks] = useState([...mockData]);
  const [lists, setLists] = useState([]);
  const [current, setCurrent] = useState([]);
  const [input, setInput] = useState('');
  const [popup, setPopup] = useState(false);
  const [modal, setModal] = useState('');

  useEffect(() => {
    if (current.length > 0) {
      //re-renders all tasks because toDo prop for <Display/> is a variable
      let inListNow = current.find((item) => item.list).list;
      setCurrent(tasks.filter((item) => item.list === inListNow));
      reduceListNames(tasks);
    }
    reduceListNames(tasks);
  }, [tasks]);

  // returns tallied names of task lists as an object
  const reduceListNames = (obj) => {
    let reducer = obj.reduce((a, b) => {
      if (!a[b.list]) {
        a[b.list] = 0;
      }
      a[b.list]++;
      return a;
    }, {});
    setLists(Object.keys(reducer));
  };

  const handleListSelection = (e) => {
    // returns objects that match the list clicked
    let selectedList = tasks.filter(
      (item) => item.list === e.target.textContent
    );
    setCurrent([...selectedList]);
  };

  const handleNavClick = (e) => {
    setPopup(!popup);
    setModal(e.target.id);
  };

  const handleSubmitList = () => {
    setLists(lists.concat(input));
    setPopup(!popup);
    setInput('');
  };

  const handleSubmitTask = () => {
    let inListNow = current.find((item) => item.list).list;
    setTasks(
      tasks.concat({
        task: input,
        complete: false,
        list: inListNow,
      })
    );
    setCurrent(tasks.filter((item) => item.list === inListNow));
    setPopup(!popup);
    setInput('');
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="app">
      {popup ? (
        <Popup
          value={input}
          onClick={() => setPopup(!popup)}
          name={modal}
          onChange={handleInputChange}
          onSubmit={modal === 'list' ? handleSubmitList : handleSubmitTask}
        />
      ) : null}
      <Nav onAddList={handleNavClick} onAddTask={handleNavClick} />
      <div className="main">
        <Sidebar
          current={current}
          lists={lists}
          onListClick={handleListSelection}
        />
        <Display toDo={current} />
      </div>
    </div>
  );
};

export default App;
