import React from "react";
import './PaginaPrincipal.css';
import { Link } from 'react-router-dom';

const PaginaPrincipal = () => {
    return (
        <div class="pagina-principal">
            <h1 class="title is-1">¡Bienvenido a CoolGoat!</h1>
            <div class="columns">
                <div class="column">
                    <Link class="hero is-large is-info" to="/partidos">
                        <div class="hero-body">
                            <h3 class="title is-3">Partidos</h3>
                            <h5 class="subtitle is-5">Revisa los partidos que estan en desarrollo</h5>
                        </div>
                    </Link>
                </div>
                <div class="column">
                    <Link class="hero is-large is-fullwidth is-info" to="/resultados">
                        <div class="hero-body">
                            <h3 class="title is-3">Resultados</h3>
                            <h5 class="subtitle is-5">Revisa los resultados de partidos finallizados</h5>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaginaPrincipal;