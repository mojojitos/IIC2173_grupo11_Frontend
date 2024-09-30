import React from "react";
import './Navbar.scss';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const Billetera = () => {
    return (
        <Link className="navbar-item" to="/wallet">
            Billetera
        </Link>
    )
}

const Logout = () => {
    const { logout } = useAuth0();
  
    const handleLogout = () => {
      logout({
        returnTo: window.location.origin,
      });
    };
  
    return (
      <Link classNameName="button is-light" onClick={handleLogout}>
        <strong>Log Out</strong>
      </Link>
    );
};

const Login = () => {
    return (
        <Link className="button is-light" to="/login">
            <strong>Log In</strong>
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
    const { isAuthenticated } = useAuth0();
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

                    <Link className="navbar-item" to="/resultados">
                        Resultados
                    </Link>

                    { isAuthenticated && <Billetera />}
                    { isAuthenticated && <HistorialCompra />}
                    { isAuthenticated && <HistorialNotificacion />}
                </div>
            </div>
            <div className="navbar-end">
                <div className="navbar-item">
                    <div className="buttons">
                        <Link className="button is-primary" to="/signup">
                            <strong>Sign Up</strong>
                        </Link>
                        { isAuthenticated ? (
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
