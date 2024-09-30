import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './Login.scss';
// import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');
    const { loginWithRedirect, user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            loginWithRedirect({
                appState: { targetUrl: '/' },
            });
        } catch (error) {
            setStatus('Error en el login');
            console.error('Error al realizar el login:', error);
        }
    };

    useEffect(() => {
        const storeAccessToken = async () => {
            console.log(`user: ${user}`);
            if (user) {
                console.log('user saved');
            }
            if (isAuthenticated) {
                try {
                    const accessToken = await getAccessTokenSilently();
                    localStorage.setItem('accessToken', accessToken);
                    const testToken = localStorage.getItem('accessToken');
                    console.log(`Test Token: ${testToken}`);
                    console.log(`Access Token: ${accessToken}`);
                } catch (error) {
                    console.error('Error fetching access token', error);
                }
            }
        };
    
        storeAccessToken();
    }, [isAuthenticated, getAccessTokenSilently, user]);
    
    return (
        <div className="container-login">
        <div className="hero is-medium-height">
                <div className="container has-text-centered has-background-dark">
                    <div className="column is-6 is-offset-3">
                        <h3 className="title is-3 has-text-white">Ingresa como usuario de CoolGoat</h3>
                        <div className="title has-text-grey is-5">Ingresa tu correo y contraseña.</div>
                        <form onSubmit={handleSubmit}>
                            <div className="field">
                                <label className="label has-text-white">Email</label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
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
                                        Ingresa
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
    );
};

export default Login;