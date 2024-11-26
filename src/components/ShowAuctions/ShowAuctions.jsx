import React, { useEffect, useState } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import Partido from "../Partidos/Partido.jsx";
import PublishProposal from "../PublishProposal/PublishProposal.jsx";
import Loading from "../Loading/Loading.jsx";
import "./ShowAuctions.scss";

const ShowAuctions = () => {
  const [auctions, setAuctions] = useState([]);
  const [fixtures, setFixtures] = useState({});
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

    const fetchAuctions = async () => {
      try {
        const token = localStorage.getItem("TokenJWT");
        const response = await axios.get(
          // eslint-disable-next-line no-undef
          `${process.env.REACT_APP_BACKEND_LINK}/admin/auctions`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAuctions(response.data);

        const fixtureDetails = {};
        await Promise.all(
          response.data.map(async (auction) => {
            if (!fixtureDetails[auction.fixture_id]) {
              const fixtureResponse = await axios.get(
                // eslint-disable-next-line no-undef
                `${process.env.REACT_APP_BACKEND_LINK}/fixtures/${auction.fixture_id}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              fixtureDetails[auction.fixture_id] = fixtureResponse.data;
            }
          })
        );

        setFixtures(fixtureDetails);
      } catch (error) {
        console.error("Error al obtener las subastas o fixtures:", error);
        setError("No se pudieron cargar las subastas.");
      } finally {
        setLoading(false);
      }
    };

    fetchAuctions();
  }, []);

  if (!isAdmin) {
    return <p>{error || "Validando acceso..."}</p>;
  }

  if (loading) return <p><Loading /></p>;
  if (error) return <p>{error}</p>;

  if (!auctions || auctions.length === 0) {
    return <p>No hay subastas disponibles.</p>;
  }

  return (
    <div className="show-auctions">
      <h2>Subastas Disponibles</h2>
      <ul className="auctions-list">
        {auctions.map((auction) => (
          <li key={auction.auction_id} className="auction-item">
            <div className="auction-content">
              {fixtures[auction.fixture_id] ? (
                <Partido partido={fixtures[auction.fixture_id]} link="partido" />
              ) : (
                <p>Cargando detalles del partido...</p>
              )}
              <div className="auction-info">
                <p><strong>Resultado:</strong> {auction.result || "N/A"}</p>
                <p><strong>Grupo:</strong> {auction.group_id || "N/A"}</p>
                <p><strong>Cantidad:</strong> {auction.quantity}</p>
              </div>
            </div>
            <div className="action">
              <PublishProposal auctionId={auction.auction_id} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowAuctions;
