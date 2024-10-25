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
        // eslint-disable-next-line no-undef
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_LINK}/AllOldFixtures`);
        const partidosData = response.data;

        
        const partidosDetalles = await Promise.all(
          partidosData.map(async (partido) => {
            try {
              // eslint-disable-next-line no-undef
              const detalleResponse = await axios.get(`${process.env.REACT_APP_BACKEND_LINK}/fixtures/${partido.id_fixture}`);
              return detalleResponse.data; 
            } catch (error) {
              console.error(`Error al obtener los detalles del partido con ID: ${partido.id_fixture}`, error);
              return null; 
            }
          })
        );

       
        setPartidos(partidosDetalles.filter((detalle) => detalle !== null));
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
        {partidos.map((partido) => {
          if (partido && partido.fixtures && partido.fixtures.id) { // Verificación adicional
            return (
              <Partido key={partido.fixtures.id} partido={partido} link={"partido-terminado"} />
            );
          } else {
            return null;
          }
        })}
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
