import React from "react";
import './Navbar.scss';
import { Link } from 'react-router-dom';

const isLoggedIn = true;

const Billetera = () => {
    return (
        <Link class="navbar-item" to="/wallet">
            Billetera
        </Link>
    )
}

const Logout = () => {
    return (
        <Link class="button is-light" to="/logout">
            Log Out
        </Link>
    )
}

const Login = () => {
    return (
        <Link class="button is-light" to="/login">
            Log In
        </Link>
    )
}

const Historial = () => {
    return (
        <Link class="navbar-item" to="/historial-compra">
            Historial de Compras
        </Link>
    )
}

function Navbar() {
    return (
        <nav class="navbar">
            <div class="navbar-brand">
                <Link class="navbar-item" to="/pagina-principal" className="button-logo">
                    <img src="/logo.png" alt="Logo" className="navbar-logo" />
                </Link>
            </div>
            <dviv class="navbar-divider"></dviv>
            <div class="navbar-menu">
                <div class="navbar-start">
                    <Link class="navbar-item" to="/pagina-principal">
                        Inicio
                    </Link>

                    <Link class="navbar-item" to="/partidos">
                        Partidos
                    </Link>

                    { isLoggedIn && <Billetera />}
                    { isLoggedIn && <Historial />}
                </div>
            </div>
            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                        <Link class="button is-primary" to="/signup">
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
