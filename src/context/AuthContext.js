import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types'; // Importar PropTypes

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [tokenUser, setTokenUser] = useState(null);

    const postLogin = (newToken, newUser) => {
        console.log('Inside AuthContext!');
        setToken(newToken);
        setTokenUser(newUser);
        localStorage.setItem('accessToken', newToken); // Corrección de capitalización
        localStorage.setItem('user', newUser);
    };

    const postLogout = () => {
        setToken(null);
        setTokenUser(null);
        localStorage.removeItem('accessToken'); // Corrección de capitalización
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ token, tokenUser, postLogin, postLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Agregar validación de PropTypes para children
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useAuth = () => {
    return useContext(AuthContext);
};
