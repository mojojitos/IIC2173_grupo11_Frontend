import React, { useState } from 'react';
import './Login.scss';
import axios from 'axios';

const authenticateUser = async (email, password) => {
    try {
      const response = await axios.post('URL_DEL_BACKEND/login', {
        email: email,
        password: password,
      });
      return response.data; // Asume que el backend devuelve un objeto con la información del usuario
    } catch (error) {
      console.error('Error en la autenticación:', error);
      throw error;
    }
  };

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = await authenticateUser(email, password);
            setStatus('Login exitoso');
            console.log('Datos del usuario:', userData);
            // Aquí puedes redirigir al usuario o guardar el token en el estado
          } catch (error) {
            setStatus('Error en el login');
            console.error('Error al realizar el login:', error);
          }
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
                        {status && <div className="has-text-white">{status}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;