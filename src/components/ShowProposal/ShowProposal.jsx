import React, { useState, useEffect } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import PublishResponse from "../PublishResponse/PublishResponse.jsx";
import "./ShowProposal.scss";

const ShowProposal = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [proposals, setProposals] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("TokenJWT");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.scope && decodedToken.scope.includes("admin")) {
          setIsAdmin(true);
        } else {
          setStatus("Acceso denegado: Solo los administradores pueden ver las propuestas.");
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
      const fetchProposals = async () => {
        try {
          const token = localStorage.getItem("TokenJWT");
          // eslint-disable-next-line no-undef
          const response = await axios.get(`${process.env.REACT_APP_BACKEND_LINK}/admin/proposals`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setProposals(response.data);
        } catch (error) {
          console.error("Error al obtener las propuestas:", error);
          setStatus("Error al cargar las propuestas.");
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

  return (
    <div className="show-proposals">
      <h2>Propuestas Administrativas</h2>
      {proposals.length > 0 ? (
        <table className="proposals-table">
          <thead>
            <tr>
              <th>Proposal ID</th>
              <th>Fixture ID</th>
              <th>League Name</th>
              <th>Round</th>
              <th>Result</th>
              <th>Quantity</th>
              <th>Group ID</th>
              <th>Type</th>
              <th>Action</th> {/* Nueva columna para acciones */}
            </tr>
          </thead>
          <tbody>
            {proposals.map((proposal) => (
              <tr key={proposal.auction_id}>
                <td>{proposal.proposal_id || "N/A"}</td>
                <td>{proposal.fixture_id}</td>
                <td>{proposal.league_name}</td>
                <td>{proposal.round}</td>
                <td>{proposal.result || "N/A"}</td>
                <td>{proposal.quantity}</td>
                <td>{proposal.group_id}</td>
                <td>{proposal.type}</td>
                <td>
                  <PublishResponse proposalId={proposal.proposal_id || ""} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay propuestas disponibles.</p>
      )}
      {status && <p className="status">{status}</p>}
    </div>
  );
};

export default ShowProposal;
