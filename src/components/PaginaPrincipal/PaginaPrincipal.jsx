import React from "react";
import './PaginaPrincipal.scss';
import { Link } from 'react-router-dom';

const PaginaPrincipal = () => {
    return (
        <div className="pagina-principal">
            <div className="header-section has-background-black-ter">
                <div className="columns is-gapless">
                    <div className="column is-one-quarter">
                        <h1 className="title is-1">Bienvenido a</h1>
                    </div>
                    <div className="column is-half">
                        <div className="header-icon">
                            <img src="/icon.png" alt="Logo" className="logo" />
                        </div>
                    </div>
                </div>
                <p className="subtitle is-3 has-text-centered">¡La mejor plataforma de apuestas deportivas!</p>
            </div>
            <Link className="hero is-small is-info" to="/partidos">
                <div className="hero-body">
                    <h3 className="title is-3">Partidos en juego</h3>
                    <h5 className="subtitle is-5">¡Haz click aqui para ver los partidos que estan en desarrollo!</h5>
                </div>
            </Link>
        </div>
    );
};

export default PaginaPrincipal;