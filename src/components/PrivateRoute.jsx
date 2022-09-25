import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../Context';

const PrivateRoute = () => {
  const { currentUser } = useAuth();
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
