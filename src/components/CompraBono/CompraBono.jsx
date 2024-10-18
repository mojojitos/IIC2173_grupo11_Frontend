import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./CompraBono.scss";

const CompraBonos = ({ partido }) => {
  const { fixtures, teams, odds } = partido;
  const [quantity, setQuantity] = useState("");
  const [selectedResult, setSelectedResult] = useState("");
  const [selectedOdd, setSelectedOdd] = useState(null);
  const [status, setStatus] = useState("");
  const [ganancia, setGanancia] = useState(0);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("user");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleCompra = async () => {
    try {
      const requestData = {
        userId: userId,
        fixtureId: fixtures.id,
        result: selectedResult,
        quantity: quantity,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_LINK}/bonos/request`,
        requestData
      );
      setStatus("Compra exitosa");
      console.log(response.data);
    } catch (error) {
      setStatus("Error en la compra");
      console.error("Error al realizar la compra:", error);
    }
  };

  const handleResultChange = (e) => {
    const result = e.target.value;
    setSelectedResult(result);

    const foundOdd = odds.values.find((value) => value.value === result);
    setSelectedOdd(foundOdd);

    if (foundOdd) {
      setGanancia(quantity * parseFloat(foundOdd.odd) * 1000);
    } else {
      setGanancia(0);
    }
  };

  const handleQuantityChange = (e) => {
    const newQuantity = Math.max(0, Number(e.target.value));
    setQuantity(newQuantity);

    if (selectedOdd) {
      setGanancia(newQuantity * parseFloat(selectedOdd.odd) * 1000);
    }
  };

  return (
    <div className="compra-bonos">
      <h2>Comprar Bonos</h2>
      <div>
        <label>Cantidad de Bonos: </label>
        <input
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          placeholder="0"
        />
      </div>

      <div>
        <label>Resultado: </label>
        <select onChange={handleResultChange} value={selectedResult}>
          <option value="">Seleccionar resultado</option>
          <option value="Home">Victoria {teams.home.name}</option>
          <option value="Draw">Empate</option>
          <option value="Away">Victoria {teams.away.name}</option>
        </select>
      </div>

      <div className="ganancia-info">
        <p>Ganancia potencial: ${ganancia}</p>
      </div>
      <div className="precio-info">
        <p>Precio total: ${quantity * 1000}</p>
      </div>

      <button
        className="boton-comprar"
        onClick={handleCompra}
        disabled={!quantity || !selectedResult|| !userId}
      >
        Comprar
      </button>
      {status && (
        <p
          className={`status ${status === "Compra exitosa" ? "success" : "error"}`}
        >
          {status}
        </p>
      )}
    </div>
  );
};

CompraBonos.propTypes = {
  partido: PropTypes.shape({
    fixtures: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }).isRequired,
    teams: PropTypes.shape({
      home: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
      away: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    odds: PropTypes.shape({
      values: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string.isRequired,
          odd: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
            .isRequired,
        })
      ).isRequired,
    }).isRequired,
  }).isRequired,
};

export default CompraBonos;
