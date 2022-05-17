import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import {
  collection,
  query,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import AddList from './AddList';
import Nav from '../components/Nav';
import Item from './Item';
import ListFirst from '../components/ListFirst';
import { useAuth } from './AuthContext';
import { Stack } from '@mui/material';

const Dashboard = () => {
  const [currentList, setCurrentList] = useState('');
  const [todos, setTodos] = useState([]);
  const [modal, setModal] = useState('');
  const [lists, setLists] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const listsQuery = query(collection(db, 'users', currentUser.uid, 'lists'));
    const unsub = onSnapshot(listsQuery, (snapshot) => {
      let listsArr = [];
      snapshot.forEach((doc) => {
        listsArr.push({ ...doc.data(), id: doc.id });
      });

      setLists(listsArr);
    });
    return unsub;
  }, []);

  useEffect(() => {
    const todosQuery = query(collection(db, 'users', currentUser.uid, 'todos'));
    const unsub = onSnapshot(todosQuery, (snapshot) => {
      let todosArr = [];
      snapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });

      setTodos(todosArr);
    });
    return unsub;
  }, []);

  // useEffect(() => {
  //   const listsQuery = query(collection(db, 'lists'));
  //   const unsubscribeLists = onSnapshot(listsQuery, (snapshot) => {
  //     let listsArr = [];
  //     snapshot.forEach((doc) => {
  //       listsArr.push({ ...doc.data(), id: doc.id });
  //     });
  //     setLists(listsArr);
  //   });
  //   return () => unsubscribeLists();
  // }, []);

  const handleCurrent = (e) => {
    let targetList = e.target.textContent;
    let findList = lists.find((item) => item.list === targetList);
    setCurrentList(findList);
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
    <div>
      {/* {popup && currentList === '' && modal === 'task' ? (
        <ListFirst onClick={() => setPopup(!popup)} />
      ) : popup ? (
        <Popup
          choice={modal}
          onClick={() => setPopup(!popup)}
          currentList={currentList}
        />
      ) : null} */}
      <Nav
        lists={lists}
        currentList={handleCurrent}
        getCurrentList={currentList}
      />
      <Stack>
        {todos
          .filter((data) => data.list === currentList.list)
          .map((item, index) => {
            return (
              <Item
                handleComplete={handleComplete}
                key={item.id}
                todo={item}
                index={index}
                handleSubmit={handleSubmit}
                handleDelete={handleDelete}
              />
            );
          })}
      </Stack>
    </div>
  );
};

export default Dashboard;
