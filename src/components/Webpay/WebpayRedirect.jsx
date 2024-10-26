import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const WebpayRedirect = () => {
  const { requestId } = useParams();  
  
  useEffect(() => {
    const confirmWebpay = async () => {
      const tokenWs = new URLSearchParams(window.location.search).get('token_ws');
      const userId = localStorage.getItem('user'); 

      const lockKey = `webpay_confirm_lock_${requestId}`;
      if (sessionStorage.getItem(lockKey)) {
        console.log("Transacción ya en curso o procesada.");
        return;
      }

      sessionStorage.setItem(lockKey, 'processing');

      try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_LINK}/webpay/confirm/${requestId}`, {
          token_ws: tokenWs,
          userId: userId 
        });
        
        console.log('Respuesta de confirmación de Webpay:', response.status, response.data.message);
        handleTransactionStatus(response.status, response.data.message);

        sessionStorage.removeItem(lockKey);  // Eliminar el candado al finalizar
        
      } catch (error) {
        if (error.response) {
          console.error("Error inesperado en la respuesta de Webpay:", error.response);
        }
        sessionStorage.removeItem(lockKey);  // Eliminar el candado en caso de error
      }
    };
    
    confirmWebpay();
  }, [requestId]);

  const handleTransactionStatus = (status, message) => {
    console.log('Estado de la transacción:', status, message);
    if (status === 200 && message.includes('exito')) {
      alert("¡Pago exitoso!");
      window.location.href = "/resultado/exito"; 
    } else if (status === 200 && message.includes('rechazada')) {
      alert("Lo sentimos, el pago fue rechazado.");
      window.location.href = "/resultado/fallo"; 
    } else if (status === 200 && message.includes('anulada')) {
      alert("Has cancelado la compra.");
      window.location.href = "/resultado/anulado"; 
    } else {
      alert("Ocurrió un error inesperado, por favor intenta de nuevo.");
      window.location.href = "/resultado/error"; 
    }
  };
  
  return <div>Procesando el pago...</div>; 
};

export default WebpayRedirect;
