import React from 'react';
import Signup from './components/Signup';
import { Container } from 'react-bootstrap';
import { AuthProvider } from './components/AuthContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/Dashboard';
import { useAuth } from './components/AuthContext';

const App = () => {
  return (
    <div>
      <BrowserRouter>
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
      </BrowserRouter>
    </div>
  );
};

export default App;
