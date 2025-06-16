import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn, loading } = useUser();

    if (loading) {
        return <div>טוען...</div>;
    }

    if (!isLoggedIn) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute; 