import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyD5qQe5obAMG0KYemdSJeftOxOj9GVoWzM',
  authDomain: 'projects-791c6.firebaseapp.com',
  databaseURL: 'https://projects-791c6-default-rtdb.firebaseio.com',
  projectId: 'projects-791c6',
  storageBucket: 'projects-791c6.appspot.com',
  messagingSenderId: '866827473919',
  appId: '1:866827473919:web:7406a5b0842b154ecd4dca',
  measurementId: 'G-G20RZE6Q2H',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
