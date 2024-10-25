import React, { useState, useEffect } from "react";
import './Navbar.scss';
import { Link } from 'react-router-dom';

const Billetera = () => (
    <Link className="navbar-item" to="/wallet">
        Billetera
    </Link>
);

const Logout = () => {
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        // const logoutUrl = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/v2/logout?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&returnTo=${encodeURIComponent(window.location.origin)}`;
        window.location.reload(); 
    };

    return (
        <button className="button is-light" onClick={handleLogout}>
            <strong>Log Out</strong>
        </button>
    );
};

const Login = () => (
    <Link className="button is-light" to="/login">
        <strong>Log In</strong>
    </Link>
);

const HistorialCompra = () => (
    <Link className="navbar-item" to="/historial-compra">
        Historial de Compras
    </Link>
);

const HistorialNotificacion = () => (
    <Link className="navbar-item" to="/historial-notificacion">
        Notificaciones
    </Link>
);

function Navbar() {
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem("user");
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []); 

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link className="navbar-item" to="/pagina-principal" id="button-logo">
                    <img src="/logo.png" alt="Logo" className="navbar-logo" />
                </Link>
            </div>
            <div className="navbar-divider"></div>
            <div className="navbar-menu">
                <div className="navbar-start">
                    <Link className="navbar-item" to="/pagina-principal">
                        Inicio
                    </Link>
                    <Link className="navbar-item" to="/partidos">
                        Partidos
                    </Link>
                    <Link className="navbar-item" to="/resultados">
                        Resultados 
                    </Link>
                    {userId && <Billetera />}
                    {userId && <HistorialNotificacion />}
                    {userId && <HistorialCompra />}
                </div>
            </div>
            <div className="navbar-end">
                <div className="navbar-item">
                    <div className="buttons">
                        <Link className="button is-primary" to="/signup">
                            <strong>Sign Up</strong>
                        </Link>
                        {userId ? <Logout /> : <Login />}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
