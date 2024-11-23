import React, { useEffect, useState } from "react";
import axios from "axios";
import Partido from "../Partidos/Partido.jsx";
import "./ReservaInfo.scss";
import Loading from "../Loading/Loading.jsx";

const ReservaInfo = () => {
  const [reserves, setReserves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("TokenJWT");
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

  if (loading) return <p><Loading /></p>;
  if (error) return <p>{error}</p>;
  
  if (!reserves || reserves.length === 0) {
    return <p>No hay reservas disponibles.</p>;
  }

  return (
    <div className="reserva-info">
      <h1 className="reserva-title">Reservas Disponibles</h1>
      <ul className="reserves-list">
        {reserves.map((reserve) => (
          <li key={reserve.fixtures.id} className="reserve-item">
            <div className="reserve-content">
              <Partido partido={reserve} link="reserva" />
              <div className="bonus-info">
                <p>Remaining Bonus: {reserve.remaining_bonus}</p>
                <p>Admin Remaining Bonus: {reserve.admin_remaining_bonus}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservaInfo;
