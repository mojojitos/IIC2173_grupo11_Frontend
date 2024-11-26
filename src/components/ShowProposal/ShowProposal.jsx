import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Partido from "../Partidos/Partido.jsx";
import PublishResponse from "../PublishResponse/PublishResponse.jsx";
import "./ShowProposal.scss";

const ShowProposal = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [proposals, setProposals] = useState([]);
  const [fixtures, setFixtures] = useState({});
  const [auctionFixtures, setAuctionFixtures] = useState({});
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("TokenJWT");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.scope && decodedToken.scope.includes("admin")) {
          setIsAdmin(true);
        } else {
          setStatus("Acceso denegado: Solo los administradores pueden ver las propuestas.");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        setStatus("Error de autenticación. Por favor, inicia sesión nuevamente.");
        setLoading(false);
      }
    } else {
      setStatus("Token no encontrado. Por favor, inicia sesión.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAdmin) {
      const fetchProposals = async () => {
        try {
          const token = localStorage.getItem("TokenJWT");
          const response = await axios.get(
            // eslint-disable-next-line no-undef
            `${process.env.REACT_APP_BACKEND_LINK}/admin/proposals`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setProposals(response.data);

          const fixtureDetails = {};
          const auctionFixtureDetails = {};

          await Promise.all(
            response.data.map(async (proposal) => {
              if (!fixtureDetails[proposal.fixture_id]) {
                const fixtureResponse = await axios.get(
                  // eslint-disable-next-line no-undef
                  `${process.env.REACT_APP_BACKEND_LINK}/fixtures/${proposal.fixture_id}`,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );
                fixtureDetails[proposal.fixture_id] = fixtureResponse.data;
              }

              if (!auctionFixtureDetails[proposal.auction_fixture_id]) {
                const auctionFixtureResponse = await axios.get(
                  // eslint-disable-next-line no-undef
                  `${process.env.REACT_APP_BACKEND_LINK}/fixtures/${proposal.auction_fixture_id}`,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );
                auctionFixtureDetails[proposal.auction_fixture_id] =
                  auctionFixtureResponse.data;
              }
            })
          );

          setFixtures(fixtureDetails);
          setAuctionFixtures(auctionFixtureDetails);
        } catch (error) {
          console.error("Error al obtener las propuestas o fixtures:", error);
          setStatus("Error al cargar las propuestas.");
        } finally {
          setLoading(false);
        }
      };

      fetchProposals();
    }
  }, [isAdmin]);

  if (!isAdmin) {
    return (
      <div className="show-proposals">
        <p>{status || "Validando acceso..."}</p>
      </div>
    );
  }

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="show-proposals">
      <h2>Propuestas</h2>
      {proposals.length > 0 ? (
        <ul className="proposals-list">
          {proposals.map((proposal) => (
            <li key={proposal.proposal_id} className="proposal-item">
              {/* Sección izquierda: Datos de la subasta */}
              <div className="auction-info">
                <h3>Datos de la Subasta</h3>
                {auctionFixtures[proposal.auction_fixture_id] ? (
                  <Partido
                    partido={auctionFixtures[proposal.auction_fixture_id]}
                    link="partido"
                  />
                ) : (
                  <p>Cargando detalles del partido de la subasta...</p>
                )}
                <p>
                  <strong>Resultado:</strong> {proposal.auction_result || "N/A"}
                </p>
                <p>
                  <strong>Cantidad:</strong> {proposal.auction_quantity || "N/A"}
                </p>
              </div>

              {/* Sección central: Responder propuesta */}
              <div className="action">
                <PublishResponse proposalId={proposal.proposal_id || ""} />
              </div>

              {/* Sección derecha: Datos de la propuesta */}
              <div className="proposal-info">
                <h3>Datos de la Propuesta</h3>
                {fixtures[proposal.fixture_id] ? (
                  <Partido
                    partido={fixtures[proposal.fixture_id]}
                    link="partido"
                  />
                ) : (
                  <p>Cargando detalles del partido de la propuesta...</p>
                )}
                <p><strong>Resultado:</strong> {proposal.result || "N/A"}</p>
                <p><strong>Grupo:</strong> {proposal.group_id || "N/A"}</p>
                <p><strong>Cantidad:</strong> {proposal.quantity}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay propuestas disponibles.</p>
      )}
      {status && <p className="status">{status}</p>}
    </div>
  );
};

export default ShowProposal;
