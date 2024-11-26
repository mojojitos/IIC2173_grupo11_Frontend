import React, { useEffect, useState } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import Partido from "../Partidos/Partido.jsx";
import PublishAuctions from "../PublishAuctions/PublishAuctions.jsx";
import "./ReservaInfo.scss";
import Loading from "../Loading/Loading.jsx";

const ReservaInfo = () => {
  const [reserves, setReserves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("TokenJWT");

    if (!token) {
      setError("No se encontró un token válido. Por favor, inicia sesión.");
      setLoading(false);
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      if (decodedToken.scope && decodedToken.scope.includes("admin")) {
        setIsAdmin(true);
      } else {
        setError("Acceso denegado: Solo los administradores pueden ver esta información.");
        setLoading(false);
        return;
      }
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      setError("Error de autenticación. Por favor, inicia sesión nuevamente.");
      setLoading(false);
      return;
    }

    const fetchReserves = async () => {
      try {
        const response = await axios.get(
          // eslint-disable-next-line no-undef
          `${process.env.REACT_APP_BACKEND_LINK}/admin/showReserves`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setReserves(response.data);
      } catch (error) {
        console.error("Error al obtener las reservas:", error);
        setError("No se pudieron cargar las reservas.");
      } finally {
        setLoading(false);
      }
    };

    fetchReserves();
  }, []);

  if (!isAdmin) {
    return <p>{error || "Validando acceso..."}</p>;
  }

  if (loading) return <p><Loading /></p>;
  if (error) return <p>{error}</p>;

  if (!reserves || reserves.length === 0) {
    return <p>No hay reservas disponibles.</p>;
  }

  return (
    <div className="show-proposals">
      <h2>Reservas</h2>
      <ul className="proposals-list">
        {reserves.map((reserve) => (
          <li key={reserve.fixtures.id} className="proposal-item">
            <div className="proposal-content">
              <Partido partido={reserve} link="partido" />
              <div className="proposal-info">
                <p><strong>Remaining Bonus:</strong> {reserve.remaining_bonus}</p>
                <p><strong>Admin Remaining Bonus:</strong> {reserve.admin_remaining_bonus}</p>
              </div>
            </div>
            <div className="action">
              <PublishAuctions idFixture={reserve.fixtures.id} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservaInfo;
