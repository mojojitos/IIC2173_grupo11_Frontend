import React from "react";
import './Navbar.css';
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

function Navbar() {
    return (
        <nav class="navbar">
            <dviv class="navbar-divider"></dviv>
            <div class="navbar-menu">
                <div class="navbar-start">
                    <Link class="navbar-item" to="/pagina-principal">
                        Inicio
                    </Link>

                    <Link class="navbar-item" to="/partidos">
                        Partidos
                    </Link>

                    <Link class="navbar-item" to="/resultados">
                        Resultados
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

// Nota: Agregar boton de Log out en caso de que el usuario este logueado