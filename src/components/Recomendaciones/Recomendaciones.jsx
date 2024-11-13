import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Recomendaciones.scss";

const Recomendaciones = ({ link }) => {
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
      // eslint-disable-next-line no-undef
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
    <div className="recomendaciones-container">
      <h1>Partidos Recomendados</h1>
      <ul className="recomendaciones-list">
      {recomendaciones.map((recomendacion) => (
          <li className="partido-item">
             <Link to={`/${link}/${recomendacion.fixtures.id}`} className="recomendaciones-link">
              <div className="recomendaciones-match-info">
                <div className="recomendaciones-team-logo">
                  <img
                    src={recomendacion.teams.home.logo}
                    alt={`${recomendacion.teams.home.name} logo`}
                  />
                </div>
                <div className="recomendaciones-team-name">{recomendacion.teams.home.name}</div>
                <span>vs</span>
                <div className="recomendaciones-team-name">{recomendacion.teams.away.name}</div>
                <div className="recomendaciones-team-logo">
                  <img
                    src={recomendacion.teams.away.logo}
                    alt={`${recomendacion.teams.away.name} logo`}
                  />
                </div>
                <div className="recomendaciones-match-date">
                  {new Date(recomendacion.date).toLocaleString()}
                </div>
                <div className="recomendaciones-league-logo">
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

Recomendaciones.propTypes = {
  link: PropTypes.string.isRequired,
};

export default Recomendaciones;