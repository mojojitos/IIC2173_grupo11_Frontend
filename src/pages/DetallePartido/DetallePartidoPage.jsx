import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CompraBonos from "../../components/CompraBono/CompraBono.jsx";
import DetallePartido from "../../components/DetallePartido/DetallePartido.jsx";
import axios from "axios";

const DetallePartidoPage = () => {
  const [partidos, setPartidos] = useState([]);

  useEffect(() => {
    const fetchPartidos = async () => {
      try {
        const response = await axios.get("http://localhost:8000/fixtures");
        setPartidos(response.data);
        console.log("Partidos:", response.data);
      } catch (error) {
        console.error("Error al obtener los partidos:", error);
      }
    };

    fetchPartidos();
  }, []);
  const { fixtureId } = useParams(); // Obtener el id desde la URL
  const partido = partidos.find(
    (p) => p.fixture_id === parseInt(fixtureId, 10)
  ); // Buscar el partido por fixtureId
  if (!partido) {
    return <p>Partido no encontrado</p>;
  }

  return (
    <div>
      <DetallePartido partido={partido} />
      <CompraBonos partido={partido} />
    </div>
  );
};

export default DetallePartidoPage;
