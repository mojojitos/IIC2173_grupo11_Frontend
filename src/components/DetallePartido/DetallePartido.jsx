import React from "react";
import "./DetallePartido.scss";

const DetallePartido = ({ partido }) => {
  return (
    <div className="detalle-partido">
      <h1>
        {partido.teams.home.name} vs {partido.teams.away.name}
      </h1>
      <p>Fecha: {new Date(partido.date).toLocaleString()}</p>
      <p>Estado: {partido.status.long}</p>

      <div className="league-info">
        <p>
          Liga: {partido.league.name} ({partido.league.country})
        </p>
        <img src={partido.league.logo} alt="Logo de la liga" />
      </div>

      <p>Árbitro: {partido.referee}</p>
      <p>Ronda: {partido.league.round}</p>
      <p>Temporada: {partido.league.season}</p>

      <h3>Equipos:</h3>
      <div className="team">
        <p className="team-name">Equipo Local: {partido.teams.home.name}</p>
        <img
          className="team-logo"
          src={partido.teams.home.logo}
          alt={`${partido.teams.home.name} logo`}
        />
      </div>
      <div className="team">
        <p className="team-name">Equipo Visitante: {partido.teams.away.name}</p>
        <img
          className="team-logo"
          src={partido.teams.away.logo}
          alt={`${partido.teams.away.name} logo`}
        />
      </div>

      <h3>Probabilidades:</h3>
      <ul className="odds">
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
