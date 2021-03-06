import React from 'react';
import Signup from './components/Signup';
import { AuthProvider } from './components/AuthContext';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <div>
      <HashRouter>
        <AuthProvider>
          <Routes>
            <Route path="/react-to-do-list" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route exact path="/" element={<PrivateRoute />}>
              <Route exact path="/" element={<Dashboard />} />
            </Route>
          </Routes>
        </AuthProvider>
      </HashRouter>
    </div>
  );
};

export default App;
