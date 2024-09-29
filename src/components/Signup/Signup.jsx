import React, { useState } from 'react';
import axios from 'axios';
import './Signup.scss';

const Signup = () => {
    const [Username, setUsername] = useState('');
    const [Nombre, setNombre] = useState('');
    const [Apellido, setApellido] = useState('');
    const [Correo, setCorreo] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://api-g11:3000/createFakeUser', {
                Username,
                Nombre,
                Apellido,
                Correo
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
                            <div className="field ">
                                <div className="control">
                                    <button className="button is-primary" type="submit">Registrate</button>
                                </div>
                            </div>
                        </form>
                        {message && <p>{message}</p>}
                    </div>
                </div>
            </div>
            <footer className="footer-background">
                <img src="/background-icon.png" alt="background-icon" />
            </footer>
        </div>
    );
};

export default Signup;