import React from "react";
import './Navbar.css';
import logo from '';

function Navbar() {
    return (
        <nav class="navbar">
            <div class="navbar-brand">
                <a class="navbar-item" href="/">
                    <img src={logo} alt="Logo" />
                </a>
            </div>
            <dviv class="navbar-divider"></dviv>
            <div class="navbar-menu">
                <div class="navbar-start">
                    <a class="navbar-item" href="/">
                        Inicio
                    </a>

                    <a class="navbar-item" href="/">
                        Partidos
                    </a>

                    <a class="navbar-item" href="/">
                        Resultados
                    </a>

                    <a class="navbar-item" href="/">
                        Billetera
                    </a>
                </div>
            </div>
            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                        <a class="button is-primary" href="/">
                            <strong>Sign In</strong>
                        </a>
                        <a class="button is-light" href="/">
                            Log in
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;