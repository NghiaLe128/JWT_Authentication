import React, { Children, createContext, useContext, useState } from 'react'

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
    const [userName, setUserName] = useState(null);
    const [token, setToken] = useState(null);

    const login = (userDataId, userDataName, userToken) => {
        setUserId(userDataId);
        setUserName(userDataName);
        setToken(userToken);
        localStorage.setItem('userId', JSON.stringify(userDataId));
        localStorage.setItem('userName', JSON.stringify(userDataName));
        localStorage.setItem('token', userToken);
    }

    const logout = () => {
        setUserId(null);
        setUserName(null);
        setToken(null);
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('token');
    };
    return (
        <AuthContext.Provider value={{ userId, userName, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};