import React from 'react';
import './DetallePartido.css';

const DetallePartido = ({ partido }) => {
    return (
        <div className="detalle-partido">
            <h2>{partido.teams.home.name} vs {partido.teams.away.name}</h2>
            <p>Fecha: {new Date(partido.date).toLocaleString()}</p>
            <p>Liga: {partido.league.name}</p>
            <p>Ronda: {partido.league.round}</p>
        </div>
    );
};

export default DetallePartido;

