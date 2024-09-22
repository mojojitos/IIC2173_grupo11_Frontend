import React, { useState } from 'react';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);
    };
    
    return (
        <div className="hero is-fullheight">
            <div className="hero-body">
                <div className="container has-text-centered has-background-primary">
                    <div className="column is-6 is-offset-3">
                        <h3 className="title is-3 has-text-white">Ingreso de Usuario</h3>
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
                                    <button className="button is-link" type="submit">
                                        Login
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;