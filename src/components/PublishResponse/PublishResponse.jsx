import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./PublishResponse.scss";

const PublishResponse = ({ proposalId }) => {
  const [responseStatus, setResponseStatus] = useState("");
  const [auctionResponse, setAuctionResponse] = useState("");

  const handleResponse = async () => {
    if (!auctionResponse) {
      setResponseStatus("Por favor, selecciona una respuesta antes de enviar.");
      return;
    }

    try {
      const token = localStorage.getItem("TokenJWT");
      if (!token) {
        setResponseStatus("Error: Token no encontrado. Por favor, inicia sesión.");
        return;
      }

      const requestData = {
        proposal_id: proposalId,
        auction_response: auctionResponse,
      };
      // eslint-disable-next-line no-undef
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_LINK}/admin/publishResponse`, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setResponseStatus("Respuesta publicada exitosamente.");
      } else {
        setResponseStatus("Error al publicar la respuesta. Inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error al publicar la respuesta:", error);
      setResponseStatus("Error al publicar la respuesta. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className="publish-response">
      <h3>Responder Propuesta</h3>
      <div className="response-options">
        <label>
          <input
            type="radio"
            name="auctionResponse"
            value="acceptance"
            onChange={(e) => setAuctionResponse(e.target.value)}
          />
          Aceptar
        </label>
        <label>
          <input
            type="radio"
            name="auctionResponse"
            value="rejection"
            onChange={(e) => setAuctionResponse(e.target.value)}
          />
          Rechazar
        </label>
      </div>
      <button onClick={handleResponse} className="btn-response">
        Enviar Respuesta
      </button>
      {responseStatus && <p className="response-status">{responseStatus}</p>}
    </div>
  );  
};

PublishResponse.propTypes = {
  proposalId: PropTypes.string.isRequired,
};

export default PublishResponse;
