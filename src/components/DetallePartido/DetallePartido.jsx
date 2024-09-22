import React from "react";

const DetallePartido = ({ partido }) => {
  return (
    <div>
      <h1>
        {partido.teams.home.name} vs {partido.teams.away.name}
      </h1>
      <p>Fecha: {new Date(partido.date).toLocaleString()}</p>
      <p>Estado: {partido.status.long}</p>
      <p>
        Liga: {partido.league.name} ({partido.league.country})
      </p>
      <img src={partido.league.logo} alt="Logo de la liga" />

      <p>Árbitro: {partido.referee}</p>
      <p>Ronda: {partido.league.round}</p>
      <p>Temporada: {partido.league.season}</p>

      <h3>Equipos:</h3>
      <div>
        <p>Equipo Local: {partido.teams.home.name}</p>
        <img
          src={partido.teams.home.logo}
          alt={`${partido.teams.home.name} logo`}
        />
      </div>
      <div>
        <p>Equipo Visitante: {partido.teams.away.name}</p>
        <img
          src={partido.teams.away.logo}
          alt={`${partido.teams.away.name} logo`}
        />
      </div>

      <h3>Probabilidades:</h3>
      <ul>
        {partido.odds[0].values.map((odd) => (
          <li key={odd.value}>
            {odd.value === "Home" && `Victoria ${partido.teams.home.name}`}
            {odd.value === "Draw" && "Empate"}
            {odd.value === "Away" &&
              `Victoria ${partido.teams.away.name}`}: {odd.odd}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DetallePartido;
