import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const WebpayRedirect = () => {
  const { requestId } = useParams();

  useEffect(() => {
    const confirmWebpay = async () => {
      const tokenWs = new URLSearchParams(window.location.search).get('token_ws');
      const lockKey = `webpay_confirm_lock_${requestId}`;
      if (sessionStorage.getItem(lockKey)) {
        console.log("Transacción ya en curso o procesada.");
        return;
      }

      sessionStorage.setItem(lockKey, 'processing');

      try {
        const userId = localStorage.getItem('user');
        const amount = localStorage.getItem('recargaAmount');

        if (!userId || !amount) {
          alert("Faltan datos para procesar la recarga. Inténtalo nuevamente.");
          window.location.href = "/wallet";
          return;
        }
        // eslint-disable-next-line no-undef
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_LINK}/webpay/confirm_recharge/${requestId}`, {
          token_ws: tokenWs,
          userId: userId,
          amount: parseInt(amount)
        });

        handleTransactionStatus(response.status, response.data.message);
        sessionStorage.setItem(lockKey, 'completed');
        localStorage.removeItem('recargaAmount');

      } catch (error) {
        if (error.response) {
          console.error("Error inesperado en la respuesta de Webpay:", error.response);
          alert("Ocurrió un error inesperado, por favor intenta de nuevo.");
          window.location.href = "/wallet";
        }
      }
    };

    confirmWebpay();
  }, [requestId]);

  const handleTransactionStatus = (status, message) => {
    if (status === 200 && message.includes('Recarga exitosa')) {
      alert("¡Recarga exitosa!");
      window.location.href = "/wallet"; 
    } else if (status === 200 && message.includes('rechazada')) {
      alert("Lo sentimos, la recarga fue rechazada.");
      window.location.href = "/wallet"; 
    } else if (status === 200 && message.includes('anulada')) {
      alert("Has cancelado la recarga.");
      window.location.href = "/wallet"; 
    } else {
      alert("Ocurrió un error inesperado, por favor intenta de nuevo.");
      window.location.href = "/wallet"; 
    }
  };
  
  return <div>Procesando la recarga...</div>; 
};

export default WebpayRedirect;
