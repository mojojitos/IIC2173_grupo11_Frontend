import React from "react";
import { Link } from "react-router-dom";
import "./Partido.scss";

const Partido = ({ partido, link }) => {
  const oddsValues = partido.odds?.values || [];
  return (
    <li className="partido-item">
      <Link to={`/${link}/${partido.fixtures.id}`} className="partido-link">
        {/* Logo y nombre de la liga */}
        <div className="league-info">
          <img src={partido.league.logo} alt={`${partido.league.name} logo`} className="league-logo" />
          <span className="league-name">{partido.league.name}</span>
        </div>

        <div className="match-info">
          <div className="team-info">
            <div className="team">
              <img
                src={partido.teams.home.logo}
                alt={`${partido.teams.home.name} logo`}
                className="team-logo"
              />
              <span className="team-name">{partido.teams.home.name}</span>
            </div>
            <div className="team">
              <img
                src={partido.teams.away.logo}
                alt={`${partido.teams.away.name} logo`}
                className="team-logo"
              />
              <span className="team-name">{partido.teams.away.name}</span>
            </div>
          </div>
          <div className="match-date">
            <span>{new Date(partido.fixtures.date).toLocaleDateString()}</span>
            <span>{new Date(partido.fixtures.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          <div className="odds-info">
            {oddsValues.length === 3 ? (
              oddsValues.map((odd, index) => (
                <div key={index} className="odd-item">
                  {odd.value === "Home" && partido.teams.home.name}
                  {odd.value === "Draw" && "Empate"}
                  {odd.value === "Away" && partido.teams.away.name}: {odd.odd}
                </div>
              ))
            ) : (
              <div className="odd-item-no">Odds no disponibles</div>
            )}
          </div>
        </div>
      </Link>
    </li>
  );
};

export default Partido;
