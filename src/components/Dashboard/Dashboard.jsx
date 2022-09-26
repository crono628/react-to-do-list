import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { useAuth } from '../../Context';
import Navigation from '../Navigation/Navigation';

const Dashboard = () => {
  const [currentList, setCurrentList] = useState('');
  const [todos, setTodos] = useState([]);
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

  const handleCurrent = (e) => {
    let targetList = e.target.textContent;
    let findList = lists.find((item) => item.list === targetList);
    setCurrentList(findList);
  };

  const handleDeleteList = () => {
    if (currentList === '') {
      return;
    } else {
      lists
        .filter((items) => items.list === currentList.list)
        .map((list) => {
          console.log(list);
          deleteDoc(doc(db, 'users', currentUser.uid, 'lists', list.id));
        });
      todos
        .filter((items) => items.list === currentList.list)
        .map((todo) => {
          deleteDoc(doc(db, 'users', currentUser.uid, 'todos', todo.id));
        });
      setCurrentList('');
    }
  };

  return (
    <>
      <Navigation
        lists={lists}
        currentList={handleCurrent}
        getCurrentList={currentList}
        todos={todos}
        handleDeleteList={handleDeleteList}
      />
      dashboard
    </>
  );
};

export default Dashboard;
