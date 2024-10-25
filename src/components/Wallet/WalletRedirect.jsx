import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const WebpayRedirect = () => {
  const { requestId } = useParams();

  useEffect(() => {
    const confirmWebpay = async () => {
      const tokenWs = new URLSearchParams(window.location.search).get('token_ws');

      // Verificar si la transacción ya está en curso o fue procesada
      const lockKey = `webpay_confirm_lock_${requestId}`;
      if (sessionStorage.getItem(lockKey)) {
        console.log("Transacción ya en curso o procesada.");
        return;
      }

      // Marcar el inicio de la transacción en `sessionStorage`
      sessionStorage.setItem(lockKey, 'processing');

      try {
        // Obtener userId y amount del localStorage
        const userId = localStorage.getItem('user');
        const amount = localStorage.getItem('recargaAmount');

        if (!userId || !amount) {
          alert("Faltan datos para procesar la recarga. Inténtalo nuevamente.");
          window.location.href = "/resultado/error";
          return;
        }

        // Realizar la solicitud de confirmación de Webpay enviando userId y amount
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_LINK}/webpay/confirm_recharge/${requestId}`, {
          token_ws: tokenWs,
          userId: userId,
          amount: parseInt(amount)  // Asegurarse de que amount sea un número
        });

        console.log('Respuesta de confirmación de Webpay:', response.status, response.data.message);
        handleTransactionStatus(response.status, response.data.message);

        // Marcar la transacción como completada en `sessionStorage`
        sessionStorage.setItem(lockKey, 'completed');

        // Eliminar el amount del localStorage después de confirmar la transacción
        localStorage.removeItem('recargaAmount');

      } catch (error) {
        if (error.response) {
          console.error("Error inesperado en la respuesta de Webpay:", error.response);
          alert("Ocurrió un error inesperado, por favor intenta de nuevo.");
          window.location.href = "/resultado/error";
        }
      }
    };

    confirmWebpay();
  }, [requestId]);

  const handleTransactionStatus = (status, message) => {
    console.log('Estado de la transacción:', status, message);
    if (status === 200 && message.includes('Recarga exitosa')) {
      alert("¡Recarga exitosa!");
      window.location.href = "/resultado/exito"; 
    } else if (status === 200 && message.includes('rechazada')) {
      alert("Lo sentimos, la recarga fue rechazada.");
      window.location.href = "/resultado/fallo"; 
    } else if (status === 200 && message.includes('anulada')) {
      alert("Has cancelado la recarga.");
      window.location.href = "/resultado/anulado"; 
    } else {
      alert("Ocurrió un error inesperado, por favor intenta de nuevo.");
      window.location.href = "/resultado/error"; 
    }
  };
  
  return <div>Procesando la recarga...</div>; 
};

export default WebpayRedirect;
