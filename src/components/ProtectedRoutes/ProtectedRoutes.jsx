// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoutes = ({ children }) => {
    const { user } = useAuth();

    if (!user) {
        // Redirige a /register si el usuario no está autenticado
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoutes;
