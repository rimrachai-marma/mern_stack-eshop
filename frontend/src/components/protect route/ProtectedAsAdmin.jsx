import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedAsAdmin = ({ children }) => {
  const user = useSelector((state) => state.auth.userInfo);

  if (!user?.isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedAsAdmin;
