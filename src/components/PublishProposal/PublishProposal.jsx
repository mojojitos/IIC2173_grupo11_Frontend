import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PublishProposal.scss";
import PropTypes from "prop-types";

const PublishProposal = ({ auctionId }) => {
  const [reserves, setReserves] = useState([]);
  const [selectedFixture, setSelectedFixture] = useState("");
  const [result, setResult] = useState("");
  const [quantity, setQuantity] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    const fetchReserves = async () => {
      try {
        const token = localStorage.getItem("TokenJWT");
        const response = await axios.get(
          // eslint-disable-next-line no-undef
          `${process.env.REACT_APP_BACKEND_LINK}/admin/showReserves`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const filteredReserves = response.data.filter(
          (reserve) => reserve.admin_remaining_bonus > 0
        );
        setReserves(filteredReserves);
      } catch (error) {
        console.error("Error al obtener las reservas:", error);
        setResponseMessage("Error al cargar las reservas. Por favor, inténtalo de nuevo.");
      }
    };

    fetchReserves();
  }, []);

  const handlePublish = async () => {
    if (!auctionId || !selectedFixture || !result || !quantity) {
      setResponseMessage("Por favor, completa todos los campos antes de publicar.");
      return;
    }

    try {
      const token = localStorage.getItem("TokenJWT");
      const requestData = {
        auction_id: auctionId,
        id_fixture: selectedFixture,
        result,
        quantity,
      };
      const response = await axios.post(
        // eslint-disable-next-line no-undef
        `${process.env.REACT_APP_BACKEND_LINK}/admin/publishProposal`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setResponseMessage("Propuesta publicada exitosamente.");
      } else {
        setResponseMessage("Error al publicar la propuesta.");
      }
    } catch (error) {
      console.error("Error al publicar la propuesta:", error);
      setResponseMessage("Error al publicar la propuesta. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className="publish-proposal">
      <h3>Publicar Propuesta</h3>
      <div className="response-options">
        <label>
          Partido:
          <select
            value={selectedFixture}
            onChange={(e) => setSelectedFixture(e.target.value)}
          >
            <option value="">Seleccione un partido</option>
            {reserves.map((reserve) => (
              <option
                key={reserve.fixtures.id}
                value={reserve.fixtures.id}
              >
                {reserve.teams.home.name} vs {reserve.teams.away.name} (
                {reserve.admin_remaining_bonus})
              </option>
            ))}
          </select>
        </label>
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
PublishProposal.propTypes = {
  auctionId: PropTypes.string.isRequired,
};

export default PublishProposal;
