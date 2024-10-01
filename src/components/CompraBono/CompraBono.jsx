import React, { useState } from "react";
import axios from "axios";
import "./CompraBono.scss";

const CompraBonos = ({ partido }) => {
  const {
    fixture_id,
    league: { name: leagueName, round },
    date,
    teams,
    odds,
  } = partido;
  const [quantity, setQuantity] = useState(0);
  const [selectedResult, setSelectedResult] = useState("");
  const [selectedOdd, setSelectedOdd] = useState(0);
  const [status, setStatus] = useState("");
  const [ganancia, setGanancia] = useState(0);

  const handleCompra = async () => {
    const resultToSend = selectedResult === "Empate" ? "---" : selectedResult;
    try {
      const requestData = {
        request_id: crypto.randomUUID(),
        group_id: "11",
        fixture_id: fixture_id,
        league_name: leagueName,
        round: round,
        date: date,
        result: resultToSend,
        deposit_token: "",
        datetime: new Date().toISOString(),
        quantity: quantity,
        seller: 0,
      };

      const response = await axios.post(
        "Link a la API de compra de bonos",
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

    const selectedOdd = odds[0].values.find((value) => {
      if (result === teams.home.name) return value.value === "Home";
      if (result === "Empate") return value.value === "Draw";
      if (result === teams.away.name) return value.value === "Away";
      return false;
    });
    setSelectedOdd(selectedOdd);

    if (selectedOdd) {
      setGanancia(quantity * parseFloat(selectedOdd.odd * 1000));
    } else {
      setGanancia(0);
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
          onChange={(e) => {
            const newQuantity = Number(e.target.value);
            setQuantity(newQuantity);

            if (selectedOdd) {
              setGanancia(newQuantity * parseFloat(selectedOdd.odd) * 1000);
            }
          }}
        />
      </div>

      <div>
        <label>Resultado: </label>
        <select onChange={handleResultChange}>
          <option value="">Seleccionar resultado</option>
          <option value={teams.home.name}>Victoria {teams.home.name}</option>
          <option value="Empate">Empate</option>
          <option value={teams.away.name}>Victoria {teams.away.name}</option>
        </select>
      </div>

      <div className="ganancia-info">
        <p>Ganancia potencial: {ganancia}</p>
      </div>
      <div className="precio-info">
        <p>Precio total: {quantity * 1000}</p>
      </div>

      <button className="boton-comprar" onClick={handleCompra}>
        Comprar
      </button>
      {status && (
        <p
          className={`status ${
            status === "Compra exitosa" ? "success" : "error"
          }`}
        >
          {status}
        </p>
      )}
    </div>
  );
};

export default CompraBonos;
