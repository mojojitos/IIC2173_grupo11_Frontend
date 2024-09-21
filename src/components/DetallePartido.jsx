import React from 'react';

const DetallePartido = ({ partido }) => {
    return (
        <div>
            <h2>Detalles del Partido</h2>
            <h3>{partido.teams.home.name} vs {partido.teams.away.name}</h3>
            <p>Fecha: {new Date(partido.date).toLocaleString()}</p>
            <p>Goles: {partido.goals.home ? partido.goals.home : "0"} : {partido.goals.away ? partido.goals.away : "0"} </p>
            <p>Árbitro: {partido.referee}</p>
            <p>
                {partido.teams.home.name} vs {partido.teams.away.name}
            </p>
            <p>
                Liga: {partido.league.name}, Ronda: {partido.league.round}
            </p>
            <p>Estado del partido: {partido.status.long}</p>
        </div>
    );
};

export default DetallePartido;
