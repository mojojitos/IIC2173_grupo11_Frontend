import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import './CompraResultado.scss';

const CompraResultado = () => {
  const { state, requestId } = useParams();
  const [compra, setCompra] = useState(null); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    if (state === 'exito') {
      const fetchCompra = async () => {
        try {
          // eslint-disable-next-line no-undef
          const response = await axios.get(`${process.env.REACT_APP_BACKEND_LINK}/compra/${requestId}`);
          
          if (response.data && response.data.compra) {
            setCompra(response.data.compra); 
            console.log('Información de la compra:', response.data.compra);
          } else {
            setError('La compra no existe o no se pudo encontrar.');
          }
        } catch (err) {
          setError('Error al obtener la información de la compra');
          console.error(err);
        }
      };

      fetchCompra();
    }
  }, [state, requestId]);

  const renderEstadoTransaccion = () => {
    switch (state) {
      case 'exito':
        return '¡Compra Exitosa!';
      case 'rechazada':
        return 'Compra Rechazada';
      case 'anulado':
        return 'Compra Anulada';
      case 'error':
        return 'Error en la Transacción';
      default:
        return '';
    }
  };

  const renderMensajeTransaccion = () => {
    switch (state) {
      case 'exito':
        return 'La compra ha sido confirmada exitosamente.';
      case 'rechazada':
        return 'Lo sentimos, la compra fue rechazada.';
      case 'anulado':
        return 'La compra ha sido anulada por el usuario.';
      case 'error':
        return 'Ha ocurrido un error al procesar la transacción.';
      default:
        return '';
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="compra-resultado">
      <div className="header">
        <h1>{renderEstadoTransaccion()}</h1>
        <p>{new Date().toLocaleString()}</p>
      </div>

      <div className="compra-info">
        <p>{renderMensajeTransaccion()}</p>
        {state === 'exito' && compra && (
          <div>
            <p>ID de la Compra: {compra.id_request || 'Desconocido'}</p>
            <p>Bonos Utilizados: {compra.number_bonus || '0'}</p>
            <p>Estado de la Compra: {compra.state || 'Desconocido'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

CompraResultado.propTypes = {
  state: PropTypes.string,
  compra: PropTypes.shape({
    id_request: PropTypes.string,
    number_bonus: PropTypes.number,
    state: PropTypes.string,
  }),
};

export default CompraResultado;
