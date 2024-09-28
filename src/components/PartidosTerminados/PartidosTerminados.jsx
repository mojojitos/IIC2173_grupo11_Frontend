import React, { useEffect, useState } from "react";
import axios from "axios";
import Partido from "../Partidos/Partido.jsx";
import "./PartidosTerminados.scss";

const PartidosTerminados = () => {
  const [partidos, setPartidos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPartidosTerminados = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://localhost:3000/oldfixtures?page=${page}`);
        setPartidos(response.data);
      } catch (error) {
        console.error("Error al obtener los partidos terminados:", error);
        setError("Error al obtener los partidos terminados.");
      } finally {
        setLoading(false);
      }
    };

    fetchPartidosTerminados();
  }, [page]);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="partidos-list">
      <h1>Partidos Terminados</h1>
      <ul>
        {partidos.map((partido) => (
          <Partido key={partido.fixtures.id} partido={partido} />
        ))}
      </ul>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={page === 1}>
          Anterior
        </button>
        <span>Página {page}</span>
        <button onClick={handleNextPage}>Siguiente</button>
      </div>
    </div>
  );
};

export default PartidosTerminados;
