import React from "react";
import './Navbar.scss';
import { Link } from 'react-router-dom';

const isLoggedIn = false;

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
