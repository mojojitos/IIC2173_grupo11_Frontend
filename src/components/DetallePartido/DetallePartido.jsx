import React from "react";
import "./DetallePartido.scss";

const DetallePartido = ({ partido }) => {
  const { fixtures, league, teams, odds, goals, remaining_bonus } = partido || {};

  return (
    <div className="detalle-partido">
      <div className="match-header">
        <div className="date-league">
          {league?.logo && (
            <img src={league.logo} alt={`Logo de la liga ${league?.name}`} className="league-logo" />
          )}
          <p className="match-date">
            {fixtures?.date
              ? new Date(fixtures.date).toLocaleString('es-ES', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : "Fecha no disponible"}
          </p>
        </div>
        <div className="match-details">
          <div className="team">
            <img
              src={teams?.home?.logo}
              alt={`${teams?.home?.name} logo`}
              className="team-logo"
            />
            <div>
              <span className="team-name">{teams?.home?.name || "Equipo Local"}</span>
              <p className="team-goals">{goals?.home !== null ? goals.home : "0"}</p>
            </div>
          </div>
          <div className="vs-indicator">
            VS
            <p className="match-status">{fixtures?.status?.long || "Estado no disponible"}</p> {/* Estado del partido */}
          </div>
          <div className="team">
            <img
              src={teams?.away?.logo}
              alt={`${teams?.away?.name} logo`}
              className="team-logo"
            />
            <div>
              <span className="team-name">{teams?.away?.name || "Equipo Visitante"}</span>
              <p className="team-goals">{goals?.away !== null ? goals.away : "0"}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="additional-info">
        <p>Liga: {league?.name || "Liga no disponible"} ({league?.country || "País no disponible"})</p>
        <p>Árbitro: {fixtures?.referee || "Árbitro no disponible"}</p>
        <p>Ronda: {league?.round || "Ronda no disponible"}</p>
        <p>Temporada: {league?.season || "Temporada no disponible"}</p>
        <p>Bonos: {remaining_bonus ?? "Bonos no disponibles"}</p>

        <h3>Probabilidades:</h3>
        <ul className="odds">
          {odds?.values?.length ? (
            odds.values.map((odd) => (
              <li key={odd.value}>
                {odd.value === "Home" && `Victoria ${teams?.home?.name || "Local"}`}
                {odd.value === "Draw" && "Empate"}
                {odd.value === "Away" && `Victoria ${teams?.away?.name || "Visitante"}`}: {odd.odd}
              </li>
            ))
          ) : (
            <li>No hay probabilidades disponibles</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DetallePartido;
