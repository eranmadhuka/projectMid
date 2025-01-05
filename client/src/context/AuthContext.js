import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [additionalData, setAdditionalData] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setCurrentUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Failed to parse stored user:", error);
            }
        }
    }, []);

    useEffect(() => {
        const storedAdditionalData = localStorage.getItem('additionalData');
        if (storedAdditionalData) {
            try {
                setAdditionalData(JSON.parse(storedAdditionalData));
            } catch (error) {
                console.error("Failed to parse additional data:", error);
            }
        }
    }, []);

    const login = (userData) => {
        setCurrentUser(userData);
        setAdditionalData(userData); // assuming `userData` contains additional data as well
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setCurrentUser(null);
        setAdditionalData(null);
    };

    return (
        <AuthContext.Provider value={{ currentUser, additionalData, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
