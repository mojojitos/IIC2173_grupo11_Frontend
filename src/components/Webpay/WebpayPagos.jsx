import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CompraResultado from '../CompraResultado/CompraResultado.jsx';

const WebpayPagos = () => {
  const { state, requestId } = useParams();
  const [compra, setCompra] = useState(null); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    if (state !== 'error') {
      const fetchCompra = async () => {
        try {
            // eslint-disable-next-line no-undef
          const response = await axios.get(`${process.env.REACT_APP_BACKEND_LINK}/compra/${requestId}`);
          setCompra(response.data.compra); 
          console.log('Información de la compra:', response.data.compra);
        } catch (err) {
          setError('Error al obtener la información de la compra');
          console.error(err);
        }
      };

      fetchCompra();
    }
  }, [state, requestId]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {compra || state === 'error' ? (
        <CompraResultado state={state} compra={compra} />
      ) : (
        <p>Cargando información de la compra...</p>
      )}
    </div>
  );
};

export default WebpayPagos;
