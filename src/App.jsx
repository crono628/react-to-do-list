import React from 'react';
import './App.css';
import { AuthProvider } from './Context';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
    <div className="app">
      <HashRouter>
        <AuthProvider>
          <Routes>
            <Route path="/react-to-do-list" element={<Login />} />
            {/* <Route path="/signup" element={<Signup />} /> */}
            <Route path="/login" element={<Login />} />
            <Route exact path="/" element={<PrivateRoute />}>
              <Route exact path="/" element={<Dashboard />} />
            </Route>
          </Routes>
        </AuthProvider>
      </HashRouter>
    </div>
  );
}

export default App;
