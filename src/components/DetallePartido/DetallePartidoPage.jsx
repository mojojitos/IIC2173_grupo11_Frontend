import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; 
import CompraBonos from "../CompraBono/CompraBono.jsx";
import ReservaAdmin from "../ReservaAdmin/ReservaAdmin.jsx";
import DetallePartido from "./DetallePartido.jsx";
import axios from "axios";

const DetallePartidoPage = () => {
  const [partido, setPartido] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const { fixtureId } = useParams();

  useEffect(() => {
    const fetchPartido = async () => {
      if (!fixtureId) {
        setError("ID de partido no válido.");
        setLoading(false);
        return;
      }

      try {
        // eslint-disable-next-line no-undef
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_LINK}/fixtures/${fixtureId}`);
        setPartido(response.data);
      } catch (error) {
        console.error("Error al obtener los partidos:", error);
        setError("Error al obtener los datos del partido.");
      } finally {
        setLoading(false);
      }
    };

    fetchPartido();

    // Verificar el token JWT para determinar si es admin
    const token = localStorage.getItem("TokenJWT");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log("Decoded token:", decodedToken);
        if (decodedToken.scope && decodedToken.scope.includes("admin")) {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error("Error al decodificar el token:", error);
      }
    }
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
      {isAdmin && <ReservaAdmin partido={partido} />}
    </div>
  );
};

export default DetallePartidoPage;