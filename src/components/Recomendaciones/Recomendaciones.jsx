import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Recomendaciones.scss";

const Recomendaciones = () => {
  const [recomendaciones, setRecomendaciones] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("user");
    if (storedUserId) {
        setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      axios.get(`${process.env.REACT_APP_BACKEND_LINK}/recommendations/${userId}`)
          .then(response => {
              setRecomendaciones(response.data);
          })
          .catch(error => {
              console.error('Error al obtener las recomendaciones:', error);
          });
        }
      }, [userId]);

  return (
    <div className="recomendaciones-list">
      <h1>Partidos Recomendados</h1>
      <ul>
        {recomendaciones.map((recomendacion) => (
          <li key={recomendacion.fixture_id}>
            <Link to={`/partido/${recomendacion.fixture_id}`}>
              <div className="match-info">
                <div className="team-logo">
                  <img
                    src={recomendacion.teams.home.logo}
                    alt={`${recomendacion.teams.home.name} logo`}
                  />
                </div>
                <div className="team-name">{recomendacion.teams.home.name}</div>
                <span>vs</span>
                <div className="team-name">{recomendacion.teams.away.name}</div>
                <div className="team-logo">
                  <img
                    src={recomendacion.teams.away.logo}
                    alt={`${recomendacion.teams.away.name} logo`}
                  />
                </div>
                <div className="match-date">
                  {new Date(recomendacion.date).toLocaleString()}
                </div>
                <div className="league-logo">
                  <img src={recomendacion.league.logo} alt="Logo de la liga" />
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recomendaciones;
