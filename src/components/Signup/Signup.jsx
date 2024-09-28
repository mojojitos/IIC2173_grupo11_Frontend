import React, { useState } from 'react';
import axios from 'axios';
import './Signup.scss';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('https://tu-backend.com/api/usuarios', {
                email,
                password
            });

            if (response.status === 200) {
                setMessage('Usuario creado exitosamente');
            } else {
                setMessage('Error al crear el usuario');
            }
        } catch (error) {
            setMessage('Error de red');
        }
    };

    return (
        <div className="container-signup">
            <div className="columns is-centered">
                <div className="column is-half">
                    <form onSubmit={handleSubmit}>
                        <div className="field">
                            <label className="label">Email</label>
                            <div className="control">
                                <input 
                                    className="input" 
                                    type="email" 
                                    placeholder="e.g. alex@example.com" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required 
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Password</label>
                            <div className="control">
                                <input 
                                    className="input" 
                                    type="password" 
                                    placeholder="********" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required 
                                />
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <button className="button is-primary" type="submit">Sign In</button>
                            </div>
                        </div>
                    </form>
                    {message && <p>{message}</p>}
                </div>
            </div>
        </div>
    );
};

export default Signup;