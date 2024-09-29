import React from "react";
import './PaginaPrincipal.scss';
import { Link } from 'react-router-dom';

const PaginaPrincipal = () => {
    return (
        <div class="pagina-principal">
            <div class="header-section has-background-black-ter">
                <div class="columns is-gapless">
                    <div class="column is-one-quarter">
                        <h1 class="title is-1">Bienvenido a</h1>
                    </div>
                    <div class="column is-half">
                        <div class="header-icon">
                            <img src="/icon.png" alt="Logo" class="logo" />
                        </div>
                    </div>
                </div>
                <p class="subtitle is-3 has-text-centered">¡La mejor plataforma de apuestas deportivas!</p>
            </div>
            <Link class="hero is-small is-info" to="/partidos">
                <div class="hero-body">
                    <h3 class="title is-3">Partidos en juego</h3>
                    <h5 class="subtitle is-5">¡Haz click aqui para ver los partidos que estan en desarrollo!</h5>
                </div>
            </Link>
        </div>
    );
};

export default PaginaPrincipal;