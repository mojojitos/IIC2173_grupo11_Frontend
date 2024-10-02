import React,  { useState } from "react";
import './Navbar.scss';
import { Link } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import { useAuth0 } from '@auth0/auth0-react';

const Billetera = () => {
    return (
        <Link className="navbar-item" to="/wallet">
            Billetera
        </Link>
    )
}

const Logout = () => {
    const handleLogout = () => {
        // const { postLogout } = useAuth();
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        // postLogout();
        const logoutUrl = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/v2/logout?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&returnTo=${encodeURIComponent(window.location.origin)}`;
        window.location.href = logoutUrl;
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
    // const { token, tokenUser } = useAuth();
    const [token, setToken] = useState(null);
    const [tokenUser, setTokenUser] = useState(null);
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


                    { token && <Billetera />}
                    { token && <Historial />}

                    <Link className="navbar-item" to="/resultados">
                        Resultados
                    </Link>


                </div>
            </div>
            <div className="navbar-end">
                <div className="navbar-item">
                    <div className="buttons">

                        { token ? (
                            <>
                            <p>¡Bienvenido, {tokenUser}!</p>
                            </>
                        ) : (
                            <Link className="button is-primary" to="/signup">
                                <strong>Sign Up</strong>
                            </Link>
                        )}
                        { token ? (
                            <Logout />
                        ) : (
                            <Login />
                        )}
                        { token ? "User is logged in" : "User is not logged in" }
                        { <Logout /> }

                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
