import React, { useState } from 'react';
// import { useAuth0 } from '@auth0/auth0-react';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { useAuth } from '../../context/AuthContext';

const Login = () => {
    // const { postLogin } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');
    const navigate = useNavigate();
    // const { loginWithRedirect, user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // eslint-disable-next-line no-undef
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_LINK}/login`, {
                username: username,
                password: password,
            });
    
            if (response.status === 200) {
                console.log('Inicio de sesión exitoso');
                console.log(`Data: ${response.data}`);
                localStorage.setItem('accessToken', response.data.message.access_token);
                localStorage.setItem('user', response.data.userData.id);
                console.log(`accessToken: ${localStorage.getItem('accessToken')}`);
                console.log(`user: ${localStorage.getItem('user')}`);
    
                navigate('/'); 
                window.location.reload(); 
            } else {
                console.log(response.data);
                console.log('Error al iniciar sesión');
                alert(`Error al iniciar sesión: ${response.error_description}`);
            }
        } catch (error) {
            setStatus(`Error en el login: ${error.response?.data?.error_description || error.message}`);
        }
    };
    
    return (
        <div className="container-login">
        <div className="hero is-fullheight">
            <div className="hero-body">
                <div className="container has-text-centered has-background-dark">
                    <div className="column is-6 is-offset-3">
                        <h3 className="title is-3 has-text-white">Ingreso de Usuario</h3>
                        <div className="title has-text-grey is-5">Ingresa tu nombre de usuario y contraseña.</div>
                        <form onSubmit={handleSubmit}>
                            <div className="field">
                                <label className="label has-text-white">Nombre de Usuario</label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="string"
                                        placeholder="Ingresa nombre de usuario"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label has-text-white">Contraseña</label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="password"
                                        placeholder="Contraseña"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <button className="button is-primary" type="submit">
                                        Login
                                    </button>
                                </div>
                            </div>
                        </form>
                        {status && <div className="has-text-white">{status}</div>}
                    </div>
                </div>
            </div>
            <footer className="footer-background">
                    <img src="/background-icon.png" alt="background-icon" />
            </footer>
        </div>
        </div>
    );
};

export default Login;