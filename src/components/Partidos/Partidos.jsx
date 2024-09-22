import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Partidos.scss";

const Partidos = () => {
  const [partidos, setPartidos] = useState([]);

  useEffect(() => {
    const fetchPartidos = async () => {
      try {
        const response = await axios.get("http://localhost:8000/fixtures");
        setPartidos(response.data);
      } catch (error) {
        console.error("Error al obtener los partidos:", error);
      }
    };

    fetchPartidos();
  }, []);

  return (
    <div className="partidos-list">
      <h1>Partidos Disponibles</h1>
      <ul>
        {partidos.map((partido) => (
          <li key={partido.fixture_id}>
            <Link to={`/partido/${partido.fixture_id}`}>
              <div className="match-info">
                <div className="team-logo">
                  <img
                    src={partido.teams.home.logo}
                    alt={`${partido.teams.home.name} logo`}
                  />
                </div>
                <div className="team-name">{partido.teams.home.name}</div>
                <span>vs</span>
                <div className="team-name">{partido.teams.away.name}</div>
                <div className="team-logo">
                  <img
                    src={partido.teams.away.logo}
                    alt={`${partido.teams.away.name} logo`}
                  />
                </div>
                <div className="match-date">
                  {new Date(partido.date).toLocaleString()}
                </div>
                <div className="league-logo">
                  <img src={partido.league.logo} alt="Logo de la liga" />
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Partidos;
