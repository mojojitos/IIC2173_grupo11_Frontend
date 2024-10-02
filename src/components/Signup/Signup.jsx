import React, { useState } from 'react';
import axios from 'axios';
import './Signup.scss';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [Username, setUsername] = useState('');
    const [Nombre, setNombre] = useState('');
    const [Apellido, setApellido] = useState('');
    const [Correo, setCorreo] = useState('');
    const [Password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(Username, Nombre, Apellido, Correo, Password);
        try {
            const response = await axios.post(`http://localhost:3000/signup`, {
                username: Username,
                firstName: Nombre,
                lastName: Apellido,
                email: Correo,
                password: Password
            });


            if (response.status === 201) {
                setMessage('Usuario creado exitosamente');
                console.log(`Data: ${response.data}`);
                navigate('/');
            } else {
                console.log(response.data);
                setMessage('Error al crear el usuario');
                alert(response.text());
            }
        } catch (error) {
            setMessage('Error de red');
            alert(message);
        }
    };

    return (
        <div className="container-signup">
            <h2 className="title">Registrate con nosotros</h2>
            <div className="form-footer-background">
            <div className="formulario columns is-centered">
                <div className="column is-half">
                    <form onSubmit={handleSubmit}>
                        <div className="field">
                            <label className="label">Nombre de Usuario</label>
                            <div className="control">
                                <input 
                                    className="input" 
                                    type="string" 
                                    placeholder="Ingresa nombre de usuario" 
                                    value={Username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required 
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Nombre</label>
                            <div className="control">
                                <input 
                                    className="input" 
                                    type="string" 
                                    placeholder="Ingresa tu nombre" 
                                    value={Nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    required 
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Apellido</label>
                            <div className="control">
                                <input 
                                    className="input" 
                                    type="string" 
                                    placeholder="Ingresa tu apellido" 
                                    value={Apellido}
                                    onChange={(e) => setApellido(e.target.value)}
                                    required 
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Correo</label>
                            <div className="control">
                                <input 
                                    className="input" 
                                    type="string" 
                                    placeholder="Ingresa tu correo" 
                                    value={Correo}
                                    onChange={(e) => setCorreo(e.target.value)}
                                    required 
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Contraseña</label>
                            <div className="control">
                                <input 
                                    className="input" 
                                    type="password" 
                                    placeholder="Ingresa tu contraseña" 
                                    value={Password}
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
            <footer className="footer-background">
                    <img src="/background-icon.png" alt="background-icon" />
            </footer>
        </div>
        </div>
    );
};

export default Signup;