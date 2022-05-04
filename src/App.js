import React, { useState, useEffect } from 'react';

import { db } from './firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import Popup from './components/Popup';
import Nav from './components/Nav';
import Sidebar from './components/Sidebar';
import Display from './components/Display';
import ListFirst from './components/ListFirst';
import mockData from './components/testing/mockData';

const App = () => {
  const [popup, setPopup] = useState(false);
  const [edit, setEdit] = useState(false);
  const [currentList, setCurrentList] = useState('');
  // async function tester(db) {
  //   const mock = collection(db, 'mockData');
  //   const mockSnap = await getDocs(mock);
  //   const mockList = mockSnap.docs.map((doc) => doc.data());
  //   return mockList[0].mockData;
  // }

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

  const handleCurrent = (e) => {
    setCurrentList(e.target.textContent);
  };

  return (
    <div>
      {popup && currentList === '' ? (
        <ListFirst onClick={() => setPopup(!popup)} />
      ) : popup ? (
        <Popup onClick={() => setPopup(!popup)} currentList={null} />
      ) : null}
      <Nav onAddList={null} onAddTask={() => setPopup(!popup)} />
      <Sidebar current={currentList} lists={mockData} onClick={handleCurrent} />
      <Display />
    </div>
  );
};

export default App;
