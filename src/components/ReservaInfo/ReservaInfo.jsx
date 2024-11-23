import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; 
import "./ReservaInfo.scss";

const ReservaInfo = () => {
  const [reserves, setReserves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("TokenJWT");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (!decodedToken.scope?.includes("admin")) {
          navigate("/");
          return;
        }
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        navigate("/"); 
        return;
      }
    } else {
      navigate("/"); 
      return;
    }

    const fetchReserves = async () => {
      try {
        // eslint-disable-next-line no-undef
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_LINK}/admin/showReserves`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReserves(response.data);
      } catch (error) {
        console.error("Error al obtener las reservas:", error);
        setError("No se pudieron cargar las reservas.");
      } finally {
        setLoading(false);
      }
    };

    fetchReserves();
  }, [navigate]);

  if (loading) {
    return <p>Cargando reservas...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!reserves || reserves.length === 0) {
    return <p>No hay reservas disponibles.</p>;
  }

  return (
    <div className="reserva-info">
      <h2>Reservas Administrativas</h2>
      <ul className="reserves-list">
        {reserves.map((reserve, index) => {
          const {
            fixtures = {},
            league = {},
            teams = {},
            remaining_bonus,
            admin_remaining_bonus,
          } = reserve;

          return (
            <li key={index} className="reserve-item">
              <div className="fixture-info">
                <h3>
                  Liga: {league.name || "N/A"} ({league.country || "N/A"})
                </h3>
                <p>Temporada: {league.season || "N/A"}, Ronda: {league.round || "N/A"}</p>
                <p>Fecha: {fixtures.date ? new Date(fixtures.date).toLocaleString() : "N/A"}</p>
                <p>Estado: {fixtures.status?.long || "N/A"}</p>
              </div>
              <div className="teams-info">
                <div className="team home">
                  <img
                    src={teams.home?.logo || "/placeholder.png"}
                    alt={teams.home?.name || "Equipo local"}
                  />
                  <p>{teams.home?.name || "Equipo local"}</p>
                </div>
                <div className="team away">
                  <img
                    src={teams.away?.logo || "/placeholder.png"}
                    alt={teams.away?.name || "Equipo visitante"}
                  />
                  <p>{teams.away?.name || "Equipo visitante"}</p>
                </div>
              </div>
              <div className="bonus-info">
                <p>Bonos restantes: {remaining_bonus ?? "N/A"}</p>
                <p>Bonos administradores restantes: {admin_remaining_bonus ?? "N/A"}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ReservaInfo;