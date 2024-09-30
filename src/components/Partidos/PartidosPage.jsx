import React, { useEffect, useState } from "react";
import axios from "axios";
import Partido from "./Partido.jsx";
import "./PartidosPage.scss";

const Partidos = () => {
  const [partidos, setPartidos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Estados para los filtros
  const [filterDate, setFilterDate] = useState("");
  const [filterDestiny, setFilterDestiny] = useState("");

  useEffect(() => {
    const fetchPartidos = async () => {
      setLoading(true);
      setError(null);
      try {
        let url = `http://localhost:3000/fixtures?page=${page}`;
        
        // Modificar la URL según los filtros seleccionados
        if (filterDate) {
          url = `http://localhost:3000/byDate/${filterDate}?page=${page}`;
        } else if (filterDestiny) {
          url = `http://localhost:3000/byDestiny/${filterDestiny}?page=${page}`;
        }
        
        const response = await axios.get(url);
        setPartidos(response.data);
      } catch (error) {
        console.error("Error al obtener los partidos:", error);
        setError("Error al obtener los partidos.");
      } finally {
        setLoading(false);
      }
    };

    fetchPartidos();
  }, [page, filterDate, filterDestiny]); // Añadir dependencias para actualizar según los filtros y la página

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleApplyFilters = () => {
    setPage(1); // Reiniciar a la primera página
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="partidos-list">
      <h1>Partidos Disponibles</h1>

      {/* Filtros */}
      <div className="filters">
        <label>
          Filtrar por Fecha:
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </label>

        <label>
          Filtrar por Destino:
          <input
            type="text"
            placeholder="Ingrese el destino"
            value={filterDestiny}
            onChange={(e) => setFilterDestiny(e.target.value)}
          />
        </label>

        <button onClick={handleApplyFilters}>Aplicar Filtros</button>
      </div>

      <ul>
        {partidos.map((partido) => (
          <Partido key={partido.fixtures.id} partido={partido} link={"partido"} />
        ))}
      </ul>
      
      {/* Paginación */}
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

export default Partidos;
