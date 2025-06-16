import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, isUserLoggedIn } from '../services/api';

const UserContext = createContext();

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeUser = () => {
            const loggedIn = isUserLoggedIn();
            const userData = getCurrentUser();
            
            setIsLoggedIn(loggedIn);
            setUser(userData);
            setLoading(false);
        };

        initializeUser();
    }, []);

    const updateUser = (userData) => {
        setUser(userData);
        setIsLoggedIn(!!userData);
    };

    const clearUser = () => {
        setUser(null);
        setIsLoggedIn(false);
    };

    const value = {
        user,
        isLoggedIn,
        loading,
        updateUser,
        clearUser
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}; 