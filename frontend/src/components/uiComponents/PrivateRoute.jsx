import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { getCurrentUser } from '../../store/authSlice.js';
import routes from '../../utils/routes.js';

const PrivateRoute = ({ children }) => {
  const currentUser = useSelector(getCurrentUser);
  const location = useLocation();

  return currentUser ? children : <Navigate to={routes.loginPage()} state={{ from: location }} />;
};

export default PrivateRoute;
