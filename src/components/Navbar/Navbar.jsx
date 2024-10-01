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
      <button className="button is-light" onClick={handleLogout}>
        Log Out
      </button>
    );
};

const Login = () => {
    return (
        <Link className="button is-light" to="/login">
            Log In
        </Link>
    )
}

const Historial = () => {
    return (
        <Link className="navbar-item" to="/historial-compra">
            Historial de Compras
        </Link>
    )
}

function Navbar() {
    const { isAuthenticated, user } = useAuth0();
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

                    { isAuthenticated && <Billetera />}
                    { isAuthenticated && <Historial />}
                </div>
            </div>
            <div className="navbar-end">
                <div className="navbar-item">
                    <div className="buttons">
                        { isAuthenticated ? (
                            <>
                            <p>¡Bienvenido, {user.name}!</p>
                            </>
                        ) : (
                            <Link className="button is-primary" to="/signup">
                                <strong>Sign Up</strong>
                            </Link>
                        )}
                        { isAuthenticated ? (
                            <Logout />
                        ) : (
                            <Login />
                        )}
                        { isAuthenticated ? "User is logged in" : "User is not logged in" }
                        { <Logout /> }
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
