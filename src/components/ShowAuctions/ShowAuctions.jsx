import React, { useState, useEffect } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import "./ShowAuctions.scss";

const ShowAuctions = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [auctions, setAuctions] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("TokenJWT");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.scope && decodedToken.scope.includes("admin")) {
          setIsAdmin(true);
        } else {
          setStatus("Acceso denegado: Solo los administradores pueden ver las subastas.");
        }
      } catch (error) {
        console.error("Error al decodificar el token:", error);
      }
    } else {
      setStatus("Token no encontrado. Por favor, inicia sesión.");
    }
  }, []);

  useEffect(() => {
    if (isAdmin) {
      const fetchAuctions = async () => {
        try {
          const token = localStorage.getItem("TokenJWT");
          // eslint-disable-next-line no-undef
          const response = await axios.get(`${process.env.REACT_APP_BACKEND_LINK}/admin/auctions`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setAuctions(response.data);
        } catch (error) {
          console.error("Error al obtener las subastas:", error);
          setStatus("Error al cargar las subastas.");
        }
      };
      fetchAuctions();
    }
  }, [isAdmin]);

  if (!isAdmin) {
    return (
      <div className="show-auctions">
        <p>{status || "Validando acceso..."}</p>
      </div>
    );
  }

  return (
    <div className="show-auctions">
      <h2>Subastas Administrativas</h2>
      {auctions.length > 0 ? (
        <table className="auctions-table">
          <thead>
            <tr>
              <th>Auction ID</th>
              <th>Fixture ID</th>
              <th>League Name</th>
              <th>Round</th>
              <th>Result</th>
              <th>Quantity</th>
              <th>Group ID</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {auctions.map((auction) => (
              <tr key={auction.auction_id}>
                <td>{auction.auction_id}</td>
                <td>{auction.fixture_id}</td>
                <td>{auction.league_name}</td>
                <td>{auction.round}</td>
                <td>{auction.result || "N/A"}</td>
                <td>{auction.quantity}</td>
                <td>{auction.group_id}</td>
                <td>{auction.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay subastas disponibles.</p>
      )}
      {status && <p className="status">{status}</p>}
    </div>
  );
};

export default ShowAuctions;
