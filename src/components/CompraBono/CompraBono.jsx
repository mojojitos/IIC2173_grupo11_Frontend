import React, { useState } from "react";
import axios from "axios";
import "./CompraBono.scss";

const CompraBonos = ({ partido, userId }) => {
  const { fixtures, teams, odds } = partido;
  const [quantity, setQuantity] = useState("");
  const [selectedResult, setSelectedResult] = useState("");
  const [selectedOdd, setSelectedOdd] = useState(null);
  const [status, setStatus] = useState("");
  const [ganancia, setGanancia] = useState(0);

  const handleCompra = async () => {
    try {
      const requestData = {
        userId: userId,
        fixtureId: fixtures.id,
        result: selectedResult,
        quantity: quantity,
      };
      console.log(requestData);

      const response = await axios.post(
        "http://localhost:3000/bonos/request",
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
    if (newQuantity === 0) {
      setQuantity("");
    }
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
        disabled={!quantity || !selectedResult}
      >
        Comprar
      </button>
      {status && (
        <p className={`status ${status === "Compra exitosa" ? "success" : "error"}`}>
          {status}
        </p>
      )}
    </div>
  );
};

export default CompraBonos;
