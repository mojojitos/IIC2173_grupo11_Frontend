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
  const [paymentMethod, setPaymentMethod] = useState("wallet");
  const [webpayData, setWebpayData] = useState({ token: null, url: null });

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

      if (paymentMethod === "webpay") {
        // Crear el candado en `sessionStorage` antes de la redirección
        const lockKey = `webpay_confirm_lock_${fixtures.id}`;
        sessionStorage.setItem(lockKey, "processing");

        const response = await axios.post(
          // eslint-disable-next-line no-undef
          `${process.env.REACT_APP_BACKEND_LINK}/webpay/pay`,
          requestData
        );
        if (response.data && response.data.token && response.data.url) {
          setStatus("Redirigiendo a WebPay...");
          setWebpayData({
            token: response.data.token,
            url: response.data.url,
          });
          setTimeout(() => {
            document.getElementById("webpay-form").submit();
          }, 1000); 
        }
      } else if (paymentMethod === "wallet") {
        const response = await axios.post(
          // eslint-disable-next-line no-undef
          `${process.env.REACT_APP_BACKEND_LINK}/bonos/request`,
          requestData
        );
        if (response.status === 200) {
          setStatus("Compra exitosa con Wallet");
        } else {
          setStatus("Error en la compra con Wallet");
        }
      }
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

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
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
      <div>
        <label>Método de Pago: </label>
        <select onChange={handlePaymentMethodChange} value={paymentMethod}>
          <option value="wallet">Wallet</option>
          <option value="webpay">WebPay</option>
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
        disabled={!quantity || !selectedResult || !userId}
      >
        Comprar
      </button>
      {status && (
        <p
          className={`status ${status.includes("exitosa") ? "success" : "error"}`}
        >
          {status}
        </p>
      )}

      {paymentMethod === "webpay" && webpayData.url && (
        <form id="webpay-form" action={webpayData.url} method="POST">
          <input type="hidden" name="token_ws" value={webpayData.token} />
        </form>
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