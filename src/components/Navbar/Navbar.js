import React from "react";
import './Navbar.css';
import { Link } from 'react-router-dom';
import logo from '';

function Navbar() {
    return (
        <nav class="navbar">
            <div class="navbar-brand">
                <Link class="navbar-item" href="/">
                    <img src={logo} alt="Logo" />
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

                    <Link class="navbar-item" to="/resultados">
                        Resultados
                    </Link>

                    <Link class="navbar-item" to="/wallet">
                        Billetera
                    </Link>
                </div>
            </div>
            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                        <Link class="button is-primary" to="/signin">
                            <strong>Sign In</strong>
                        </Link>
                        <Link class="button is-light" to="/login">
                            Log in
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;