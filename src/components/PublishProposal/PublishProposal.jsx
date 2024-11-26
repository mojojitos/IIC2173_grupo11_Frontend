import React, { useState, useEffect } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import "./PublishProposal.scss";

const PublishProposal = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [idFixture, setIdFixture] = useState("");
  const [result, setResult] = useState("");
  const [quantity, setQuantity] = useState("");
  const [status, setStatus] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("TokenJWT");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.scope && decodedToken.scope.includes("admin")) {
          setIsAdmin(true);
        } else {
          setStatus("Acceso denegado: Solo los administradores pueden publicar propuestas.");
        }
      } catch (error) {
        console.error("Error al decodificar el token:", error);
      }
    } else {
      setStatus("Token no encontrado. Por favor, inicia sesión.");
    }
  }, []);

  const handlePublish = async () => {
    if (!idFixture || !result || !quantity) {
      setStatus("Por favor, completa todos los campos antes de publicar.");
      return;
    }

    try {
      const token = localStorage.getItem("TokenJWT");
      const requestData = {
        id_fixture: idFixture,
        result,
        quantity,
      };
      // eslint-disable-next-line no-undef
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_LINK}/admin/publishProposal`, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setResponseMessage("Propuesta publicada exitosamente.");
        setStatus("");
      } else {
        setResponseMessage("Error al publicar la propuesta.");
      }
    } catch (error) {
      console.error("Error al publicar la propuesta:", error);
      setResponseMessage("Error al publicar la propuesta. Por favor, inténtalo de nuevo.");
    }
  };

  if (!isAdmin) {
    return (
      <div className="publish-proposals">
        <p>{status || "Validando acceso..."}</p>
      </div>
    );
  }

  return (
    <div className="publish-proposals">
      <h2>Publicar Propuesta</h2>
      <div>
        <label>ID del Fixture:</label>
        <input
          type="text"
          value={idFixture}
          onChange={(e) => setIdFixture(e.target.value)}
          placeholder="Ingrese el ID del Fixture"
        />
      </div>
  
      <div>
        <label>Resultado:</label>
        <input
          type="text"
          value={result}
          onChange={(e) => setResult(e.target.value)}
          placeholder="Ingrese el resultado"
        />
      </div>
  
      <div>
        <label>Cantidad:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(0, Number(e.target.value)))}
          placeholder="Ingrese la cantidad"
        />
      </div>
  
      <button onClick={handlePublish} className="btn-publish">
        Publicar Propuesta
      </button>
  
      {responseMessage && <p className="response-message">{responseMessage}</p>}
      {status && <p className="status">{status}</p>}
    </div>
  );  
};

export default PublishProposal;
