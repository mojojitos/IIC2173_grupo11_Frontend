import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
    <div>
      <h1>Partidos Disponibles</h1>
      <ul>
        {partidos.map((partido) => (
          <li key={partido.fixture_id}>
            <Link to={`/partido/${partido.fixture_id}`}>
              {partido.teams.home.name} vs {partido.teams.away.name} -{" "}
              {new Date(partido.date).toLocaleString()}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Partidos;
