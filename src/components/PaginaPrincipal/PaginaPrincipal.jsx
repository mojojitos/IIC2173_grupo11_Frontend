import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Partido from "../Partidos/Partido.jsx";
import Loading from "../Loading/Loading.jsx";
import "./PaginaPrincipal.scss";

const PaginaPrincipal = () => {
  const [destacados, setDestacados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDestacados = async () => {
      setLoading(true);
      setError(null);
      try {
        // eslint-disable-next-line no-undef
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_LINK}/fixtures`);
        setDestacados(response.data.slice(0, 3)); 
      } catch (err) {
        console.error("Error al obtener partidos destacados:", err);
        setError("No se pudieron cargar los partidos destacados.");
      } finally {
        setLoading(false);
      }
    };

    fetchDestacados();
  }, []);

  return (
    <div className="pagina-principal">
      <div className="header-section has-background-black-ter">
            <div className="header-icon">
            <img src="/icon.png" alt="Logo" className="logo" />
            </div>
            <p className="subtitle is-3">¡La mejor plataforma de apuestas deportivas!</p>
        </div>

      <div className="main-content">
        <div className="heroes-section">
          <Link className="hero is-small is-primary" to="/partidos">
            <div className="hero-body">
              <h3 className="title is-3">Partidos en juego</h3>
              <h5 className="subtitle is-5">¡Haz click aquí para ver los partidos que están en desarrollo!</h5>
            </div>
          </Link>
          <Link className="hero is-small is-info" to="/resultados">
            <div className="hero-body">
              <h3 className="title is-3">Partidos terminados</h3>
              <h5 className="subtitle is-5">¡Haz click aquí para revisar los resultados de los partidos que ya terminaron!</h5>
            </div>
          </Link>
        </div>

        <div className="destacados-section">
          <h2 className="title is-2 has-text-centered">Partidos Destacados</h2>
          {loading && <p className="has-text-info"><Loading /></p>}
          {error && <p className="has-text-danger">{error}</p>}
          {!loading && !error && (
            <ul className="partidos-destacados">
              {destacados.map((partido) => (
                <Partido key={partido.fixtures.id} partido={partido} link={"partido"} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaginaPrincipal;
