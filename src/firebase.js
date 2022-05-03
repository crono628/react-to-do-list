import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCwpsyza5wYfbhdL0kugqhAopTLKx9BvMw',
  authDomain: 'todo-list-47c93.firebaseapp.com',
  projectId: 'todo-list-47c93',
  storageBucket: 'todo-list-47c93.appspot.com',
  messagingSenderId: '480814257039',
  appId: '1:480814257039:web:e792b7fe0ee2927ca371fa',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
