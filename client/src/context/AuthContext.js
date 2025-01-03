import React, { createContext, useContext, useState } from 'react';

// Create the Auth Context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // User state management

    const login = (userData) => {
        setUser(userData); // userData should include role, name, etc.
    };

    const logout = () => {
        setUser(null); // Clear user data on logout
    };

    // Example userData structure for testing purposes
    const exampleUserData = {
        name: 'John Doe',
        role: 'admin', // or 'instructor', 'student'
        avatar: '/path/to/avatar.jpg',
    };

    // For testing purposes, you can uncomment the following line to simulate a login
    // login(exampleUserData);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the Auth Context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 