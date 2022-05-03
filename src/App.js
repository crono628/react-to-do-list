import React, { useState, useEffect } from 'react';
import Display from './components/Display';
import Nav from './components/Nav';
import Sidebar from './components/Sidebar';
import mockData from './components/testing/mockData.js';
import Popup from './components/Popup';
import ListFirst from './components/ListFirst';
import { db } from './firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { async } from '@firebase/util';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [lists, setLists] = useState([]);
  const [current, setCurrent] = useState([]);
  const [input, setInput] = useState('');
  const [popup, setPopup] = useState(false);
  const [modal, setModal] = useState('');

  async function tester(db) {
    const mock = collection(db, 'mockData');
    const mockSnap = await getDocs(mock);
    const mockList = mockSnap.docs.map((doc) => doc.data());
    return mockList[0].mockData;
  }

  useEffect(() => {
    // async function tryit() {
    //   try {
    //     const docRef = await addDoc(collection(db, 'mockData'), {
    //       mockData,
    //     });
    //     console.log('worked?', docRef.id);
    //   } catch (e) {
    //     console.log(e);
    //   }
    // }

    // tryit();
    if (lists.length < 1) {
      async function stupid() {
        let list = await tester(db);
        setTasks(list);
        console.log(list);
      }
      stupid();
    }

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
    console.log(obj);
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
    // filters objects that match the list clicked
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
    let newEntry = tasks.concat({
      task: 'Enter tasks for new list',
      complete: false,
      list: input,
    });
    setTasks(newEntry);
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

  const handleDelete = (e) => {
    //gets parentElement of the parentElement of the click target and
    //removes button textContent so only the list item text remains (newStr)
    let copy = [...tasks];
    let up = e.target.parentElement;
    let nextUp = up.parentElement;
    let newStr = nextUp.textContent.replace(/(EditDelete)/, '');
    let index = copy.findIndex((obj) => obj.task === newStr);
    copy[index].complete = true;
    let finalCopy = copy.filter((item) => item.complete === false);
    setTasks(finalCopy);
  };

  const handleEdit = (e) => {
    let copy = [...tasks];
    let up = e.target.parentElement;
    let nextUp = up.parentElement;
    let newStr = nextUp.textContent.replace(/(EditDelete)/, '');
    let index = copy.findIndex((obj) => obj.task === newStr);
    copy[index].complete = true;
    let finalCopy = copy.filter((item) => item.complete === false);
    setTasks(finalCopy);
    setModal('task');
    setPopup(!popup);
    setInput(newStr);
  };

  return (
    <div className="app">
      {modal === 'task' && current.length < 1 && popup ? (
        <ListFirst onClick={() => setPopup(!popup)} />
      ) : popup ? (
        <Popup
          value={input}
          onClick={() => {
            setInput('');
            setPopup(!popup);
          }}
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
        <Display toDo={current} onDelete={handleDelete} onEdit={handleEdit} />
      </div>
    </div>
  );
};

export default App;
