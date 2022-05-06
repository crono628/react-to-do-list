import React, { useState, useEffect } from 'react';

import { db } from './firebase';
import {
  collection,
  query,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';
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
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const todosQuery = query(collection(db, 'todos'));
    const unsubscribeTodos = onSnapshot(todosQuery, (snapshot) => {
      let todosArr = [];
      snapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });

      setTodos(todosArr);
    });
    return () => unsubscribeTodos();
  }, []);

  useEffect(() => {
    const listsQuery = query(collection(db, 'lists'));
    const unsubscribeLists = onSnapshot(listsQuery, (snapshot) => {
      let listsArr = [];
      snapshot.forEach((doc) => {
        listsArr.push({ ...doc.data(), id: doc.id });
      });
      setLists(listsArr);
    });
    return () => unsubscribeLists();
  }, []);

  const handleCurrent = (e) => {
    let targetList = e.target.textContent;
    let findList = lists.find((item) => item.list === targetList);
    setCurrentList(findList);
  };

  const handleAddTask = (e) => {
    setModal(e.target.id);
    setPopup(!popup);
  };

  const handleAddList = (e) => {
    setModal(e.target.id);
    setPopup(!popup);
  };

  const handleComplete = async (todo) => {
    await updateDoc(doc(db, 'todos', todo.id), { completed: !todo.completed });
  };

  const handleSubmit = async (e, todo, title) => {
    e.preventDefault();
    await updateDoc(doc(db, 'todos', todo.id), { title: title });
  };

  const handleDelete = async (todo) => {
    await deleteDoc(doc(db, 'todos', todo.id));
  };

  const handleDeleteList = () => {
    lists
      .filter((items) => items.list === currentList.list)
      .map((list) => {
        console.log(list);
        deleteDoc(doc(db, 'lists', list.id));
      });
    todos
      .filter((items) => items.list === currentList.list)
      .map((todo) => {
        deleteDoc(doc(db, 'todos', todo.id));
      });
  };

  return (
    <>
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
        <Sidebar
          current={currentList}
          todos={lists}
          handleDeleteList={handleDeleteList}
          onClick={handleCurrent}
        />
        <div className="display">
          {todos
            .filter((data) => data.list === currentList.list)
            .map((item, index) => {
              return (
                <Display
                  handleComplete={handleComplete}
                  key={item.id}
                  todo={item}
                  index={index}
                  handleSubmit={handleSubmit}
                  handleDelete={handleDelete}
                />
              );
            })}
        </div>
      </div>
    </>
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
