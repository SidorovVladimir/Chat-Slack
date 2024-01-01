import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.jsx';
import routes from '../utils/routes.js';

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();

  return currentUser ? children : <Navigate to={routes.login()} />;
};

export default PrivateRoute;
