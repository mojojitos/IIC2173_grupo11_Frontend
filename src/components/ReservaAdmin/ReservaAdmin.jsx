import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import "./ReservaAdmin.scss";

const ReservaAdmin = ({ partido }) => {
  const { fixtures } = partido;
  const [quantity, setQuantity] = useState("");
  const [status, setStatus] = useState("");
  const [userId, setUserId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("TokenJWT");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.scope && decodedToken.scope.includes("admin")) {
          setIsAdmin(true);
        } else {
          setStatus("Acceso denegado: Solo los administradores pueden reservar bonos.");
        }
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        setStatus("Error de autenticación. Por favor, inicia sesión nuevamente.");
      }
    } else {
      setStatus("Token no encontrado. Por favor, inicia sesión.");
    }

    const storedUserId = localStorage.getItem("user");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleReserva = async () => {
    try {
      const token = localStorage.getItem("TokenJWT");
      if (!token) {
        setStatus("No se encontró un token válido.");
        return;
      }

      const requestData = {
        user_id: userId,
        fixture_id: fixtures.id,
        quantity: quantity,
      };

      const response = await axios.post(
        // eslint-disable-next-line no-undef
        `${process.env.REACT_APP_BACKEND_LINK}/admin/reserveBonus`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setStatus("Reserva de bonos realizada exitosamente.");
      } else {
        setStatus(response.data || "Error al realizar la reserva.");
      }
    } catch (error) {
      setStatus("Error en la reserva.");
      console.error("Error al realizar la reserva:", error);
    }
  };

  const handleQuantityChange = (e) => {
    const newQuantity = Math.max(0, Number(e.target.value));
    setQuantity(newQuantity);
  };

  if (!isAdmin) {
    return (
      <div className="reserva-admin">
        <p>{status || "Validando acceso..."}</p>
      </div>
    );
  }

  return (
    <div className="reserva-admin">
      <h2>Reservar Bonos (Admin)</h2>
      <div>
        <label>Cantidad de Bonos: </label>
        <input
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          placeholder="0"
        />
      </div>

      <div className="precio-info">
        <p>Precio total: ${quantity * 1000}</p>
      </div>

      <button
        className="boton-reservar"
        onClick={handleReserva}
        disabled={!quantity || !userId}
      >
        Reservar
      </button>
      {status && (
        <p
          className={`status ${status.includes("exitosa") ? "success" : "error"}`}
        >
          {status}
        </p>
      )}
    </div>
  );
};

ReservaAdmin.propTypes = {
  partido: PropTypes.shape({
    fixtures: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }).isRequired,
  }).isRequired,
};

export default ReservaAdmin;
