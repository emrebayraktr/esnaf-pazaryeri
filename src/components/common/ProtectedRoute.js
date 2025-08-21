// src/components/common/ProtectedRoute.js (güncellenmiş)
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { currentUser, hasRole } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && !hasRole(requiredRole)) {
    // Yetkisiz erişim - kullanıcıyı ana sayfaya yönlendir
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;