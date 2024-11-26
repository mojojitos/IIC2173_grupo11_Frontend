import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./PublishAuctions.scss";

const PublishAuctions = ({ idFixture }) => {
  const [result, setResult] = useState("");
  const [quantity, setQuantity] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handlePublish = async () => {
    if (!idFixture || !result || !quantity) {
      setResponseMessage("Por favor, completa todos los campos antes de publicar.");
      return;
    }

    try {
      const token = localStorage.getItem("TokenJWT");
      const requestData = {
        id_fixture: idFixture,
        result,
        quantity,
      };

      const response = await axios.post(
        // eslint-disable-next-line no-undef
        `${process.env.REACT_APP_BACKEND_LINK}/admin/publishAuction`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setResponseMessage("Subasta publicada exitosamente.");
      } else {
        setResponseMessage("Error al publicar la subasta.");
      }
    } catch (error) {
      console.error("Error al publicar la subasta:", error);
      setResponseMessage("Error al publicar la subasta. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className="publish-response">
      <h3>Publicar Subasta</h3>
      <div className="response-options">
        <label>
          Resultado:
          <input
            type="text"
            value={result}
            onChange={(e) => setResult(e.target.value)}
            placeholder="Ingrese el resultado"
          />
        </label>
        <label>
          Cantidad:
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(0, Number(e.target.value)))}
            placeholder="Ingrese la cantidad"
          />
        </label>
      </div>
      <button onClick={handlePublish} className="btn-response">
        Publicar
      </button>
      {responseMessage && <p className="response-status">{responseMessage}</p>}
    </div>
  );
};

PublishAuctions.propTypes = {
  idFixture: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default PublishAuctions;
