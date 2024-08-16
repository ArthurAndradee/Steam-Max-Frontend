import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
  const profile = localStorage.getItem('selectedProfile'); // Assuming selected profile is stored here

  if (!token) {
    return <Navigate to="/" />;
  }

  if (!profile) {
    return <Navigate to="/profile-picker" />;
  }

  return children;
};

export default PrivateRoute;
