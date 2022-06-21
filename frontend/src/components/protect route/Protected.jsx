import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const Protected = ({ children }) => {
  const token = useSelector((state) => state.auth.token);
  const isLoggedIn = !!token;

  const from = useLocation().pathname;

  if (!isLoggedIn) {
    return (
      <Navigate to={`/auth?redirect=${from}`} search={from} state={{ from }} />
    );
  }

  return children;
};

export default Protected;
