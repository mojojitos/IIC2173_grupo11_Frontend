import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CompraBonos from "../CompraBono/CompraBono.jsx";
import DetallePartido from "./DetallePartido.jsx";
import axios from "axios";

const DetallePartidoPage = () => {
  const [partido, setPartido] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { fixtureId } = useParams();

  useEffect(() => {
    const fetchPartido = async () => {
      if (!fixtureId) {
        setError("ID de partido no válido.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`https://npjd9zo9g3.execute-api.us-east-1.amazonaws.com/v3/fixtures/${fixtureId}`);
        setPartido(response.data);
      } catch (error) {
        console.error("Error al obtener los partidos:", error);
        setError("Error al obtener los datos del partido.");
      } finally {
        setLoading(false); // Finalizar la carga
      }
    };

    fetchPartido();
  }, [fixtureId]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!partido) {
    return <p>Partido no encontrado</p>;
  }

  return (
    <div className="detalle-partido-page">
      <DetallePartido partido={partido} />
      <CompraBonos partido={partido} />
    </div>
  );
};

export default DetallePartidoPage;
