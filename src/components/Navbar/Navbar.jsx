import React from "react";
import './Navbar.scss';
import { Link } from 'react-router-dom';

const isLoggedIn = true;

const Billetera = () => {
    return (
        <Link className="navbar-item" to="/wallet">
            Billetera
        </Link>
    )
}

const Logout = () => {
    return (
        <Link className="button is-light" to="/logout">
            Log Out
        </Link>
    )
}

const Login = () => {
    return (
        <Link className="button is-light" to="/login">
            Log In
        </Link>
    )
}

const HistorialCompra = () => {
    return (
        <Link className="navbar-item" to="/historial-compra">
            Historial de Compras
        </Link>
    )
}

const HistorialNotificacion = () => {
    return (
        <Link className="navbar-item" to="/historial-notificacion">
            Notificaciones
        </Link>
    )
}

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/pagina-principal" className="button-logo">
                    <img src="/logo.png" alt="Logo" className="navbar-logo" />
                </Link>
            </div>
            <dviv className="navbar-divider"></dviv>
            <div className="navbar-menu">
                <div className="navbar-start">
                    <Link className="navbar-item" to="/pagina-principal">
                        Inicio
                    </Link>

                    <Link className="navbar-item" to="/partidos">
                        Partidos
                    </Link>

                    { isLoggedIn && <Billetera />}
                    { isLoggedIn && <HistorialCompra />}
                    { isLoggedIn && <HistorialNotificacion />}
                </div>
            </div>
            <div className="navbar-end">
                <div className="navbar-item">
                    <div className="buttons">
                        <Link className="button is-primary" to="/signup">
                            <strong>Sign Up</strong>
                        </Link>
                        { isLoggedIn ? (
                            <Logout />
                        ) : (
                            <Login />
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
