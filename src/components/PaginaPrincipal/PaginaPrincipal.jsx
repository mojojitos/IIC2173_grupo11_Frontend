import React from "react";
import './PaginaPrincipal.scss';
import { Link } from 'react-router-dom';

const PaginaPrincipal = () => {
    return (
        <div className="pagina-principal">
            <h1 className="title is-1">¡Bienvenido a CoolGoat!</h1>
            <div className="columns">
                <div className="column">
                    <Link className="hero is-large is-info" to="/partidos">
                        <div className="hero-body">
                            <h3 className="title is-3">Partidos</h3>
                            <h5 className="subtitle is-5">Revisa los partidos que estan en desarrollo</h5>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaginaPrincipal;