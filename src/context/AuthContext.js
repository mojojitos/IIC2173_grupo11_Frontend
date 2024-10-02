import React, { createContext, useState, useContext } from 'react';
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [tokenUser, setTokenUser] = useState(null);

    const postLogin = (newToken, newUser) => {
        console.log('Inside AuthContext!');
        setToken(newToken);
        setTokenUser(newUser);
        localstorage.setItem('accessToken', newToken);
        localStorage.setItem('user', newUser);
    };

    const postLogout = () => {
        setToken(null);
        setTokenUser(null);
        localstorage.removeItem('accessToken');
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{token, tokenUser, postLogin, postLogout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};