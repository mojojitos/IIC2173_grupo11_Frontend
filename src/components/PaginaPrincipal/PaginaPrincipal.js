import React from "react";
import './PaginaPrincipal.css';
import { Link } from 'react-router-dom';

const PaginaPrincipal = () => {
    return (
        <div class="pagina-principal">
            <h1>Bienvenido a la página principal</h1>
            <div class="columns">
                <div class="column">
                    <Link class="button is-large is-fullwidth is-info" to="/partidos">
                        <h2>Partidos</h2>
                        <p>Revisa los partidos que estan en desarrollo</p>
                    </Link>
                </div>
                <div class="column">
                    <Link class="button is-large is-fullwidth is-info" to="/resultados">
                        <h2>Resultados</h2>
                        <p>Revisa los resultados de partidos finalizados</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaginaPrincipal;