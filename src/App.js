import React, { useState, useEffect } from 'react';

import { db } from './firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';
import Popup from './components/Popup';
import Nav from './components/Nav';
import Sidebar from './components/Sidebar';
import Display from './components/Display';
import ListFirst from './components/ListFirst';

const App = () => {
  const [popup, setPopup] = useState(false);
  const [currentList, setCurrentList] = useState('');
  const [todos, setTodos] = useState([]);
  const [modal, setModal] = useState('');
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const recentQuery = query(collection(db, 'todos'));
    const unsubscribe = onSnapshot(recentQuery, (snapshot) => {
      let todosArr = [];
      snapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });

      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);

  const handleCurrent = (e) => {
    setCurrentList(e.target.textContent);
  };

  const handleAddTask = (e) => {
    setModal(e.target.id);
    setPopup(!popup);
  };

  const handleAddList = (e) => {
    setModal(e.target.id);
    setPopup(!popup);
  };

  return (
    <div>
      {popup && currentList === '' && modal === 'task' ? (
        <ListFirst onClick={() => setPopup(!popup)} />
      ) : popup ? (
        <Popup
          choice={modal}
          onClick={() => setPopup(!popup)}
          currentList={currentList}
        />
      ) : null}
      <Nav onAddList={handleAddList} onAddTask={handleAddTask} />
      <div className="main">
        <Sidebar current={currentList} todos={todos} onClick={handleCurrent} />
        <Display todos={todos} current={currentList} />
      </div>
    </div>
  );
};

export default App;

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
