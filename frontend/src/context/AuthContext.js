import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
    const [userName, setUserName] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [token, setToken] = useState(null);
    const [userPassword, setUserPassword] = useState(null);
    const [userCreatedAt, setUserCreatedAt] = useState(null);

    // Login only stores the required user details for authentication
    const login = (userDataId, userDataName, userToken) => {
        setUserId(userDataId);
        setUserName(userDataName);
        setToken(userToken);

        // Store only the required data in localStorage
        localStorage.setItem('userId', JSON.stringify(userDataId));
        localStorage.setItem('userName', JSON.stringify(userDataName));
        localStorage.setItem('token', userToken);
    };

    // Profile fetches the rest of the data like password and createdAt
    const loadProfileData = (userDataEmail, userDataPassword, userDataCreatedAt) => {
        setUserPassword(userDataPassword);
        setUserCreatedAt(userDataCreatedAt);
        setUserEmail(userDataEmail);

        // Store the profile data in localStorage as needed
        localStorage.setItem('userEmail', userDataEmail);
        localStorage.setItem('userPassword', userDataPassword);
        localStorage.setItem('userCreatedAt', userDataCreatedAt);
    };

    const logout = () => {
        setUserId(null);
        setUserName(null);
        setUserEmail(null);
        setToken(null);
        setUserPassword(null);
        setUserCreatedAt(null);
        
        localStorage.clear();
    };

    return (
        <AuthContext.Provider value={{
            userId, userName, userEmail, userPassword, userCreatedAt, token,
            login, logout, loadProfileData
        }}>
            {children}
        </AuthContext.Provider>
    );
};
