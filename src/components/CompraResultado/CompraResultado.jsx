import React from 'react';
import PropTypes from 'prop-types'; 
import './CompraResultado.scss';

const CompraResultado = ({ state, compra }) => {
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

  return (
    <div className="compra-resultado">
      <div className="header">
        <h1>{renderEstadoTransaccion()}</h1>
        <p>{new Date().toLocaleString()}</p>
      </div>

      <div className="compra-info">
        <p>{renderMensajeTransaccion()}</p>
        {compra && (
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
  state: PropTypes.string.isRequired,
  compra: PropTypes.shape({
    id_request: PropTypes.string,
    number_bonus: PropTypes.number,
    state: PropTypes.string,
  }),
};

export default CompraResultado;
