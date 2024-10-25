import React, { useState, useEffect } from "react";
import "./HistorialCompra.scss";
import axios from "axios";

function HistorialCompra() {
    const [comprasRealizadas, setComprasRealizadas] = useState([]);
    const [indiceActual, setIndiceActual] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const [tamanoPagina] = useState(8);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem("user");
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    useEffect(() => {
        if (userId) {
            // eslint-disable-next-line no-undef
            axios.get(`${process.env.REACT_APP_BACKEND_LINK}/transactions/${userId}`)
                .then(response => {
                    setComprasRealizadas(response.data);
                    setTotalPaginas(Math.ceil(response.data.length / tamanoPagina));
                })
                .catch(error => {
                    console.error('Error al obtener el historial de compra:', error);
                });
        }
    }, [userId, tamanoPagina]);

    // Lógica para cambiar de página
    const handleSiguientePagina = () => {
        if (indiceActual < totalPaginas) {
            setIndiceActual(indiceActual + 1);
        }
    };

    const handlePaginaAnterior = () => {
        if (indiceActual > 1) {
            setIndiceActual(indiceActual - 1);
        }
    };

    const handleTargetPagina = (target) => {
        setIndiceActual(target);
    };

    const comprasxPagina = comprasRealizadas.slice(
        (indiceActual - 1) * tamanoPagina,
        indiceActual * tamanoPagina
    );

    return (
        <div className="container_compra">
            <div>
                <h1 className="title">Historial de Compras</h1>
                <ul>
                    {comprasxPagina.map((compra, index) => (
                        <li key={index} className="transaccion">
                            <div className="card has-background-black-ter">
                                <div className="card-content">
                                    <div className="media-content">
                                        <p className="title is-3"> Bono comprado para {compra.home} v/s {compra.away} </p>
                                        <p className="subtitle is-4"> Valor de la transaccion: ${compra.cost_transaction} </p>
                                        <div className="content">
                                        <p className="subtitle is-4"> 
                                            {compra.money_victory > 0 && "Dinero ganado: $" + compra.money_victory}
                                            {compra.money_defeat > 0 && "Dinero perdido: $" + compra.money_defeat}
                                        </p>
                                        <p className="subtitle is-6"> Fecha de la transaccion: {new Date(compra.date_transaction).toLocaleString()} </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <nav className="pagination is-right" role="navigation" aria-label="pagination">
                    <button className="pagination-previous" onClick={handlePaginaAnterior} disabled={indiceActual === 1}>
                        &lt;
                    </button>
                    <button className="pagination-next" onClick={handleSiguientePagina} disabled={indiceActual === totalPaginas}>
                        &gt;
                    </button>
                    <ul className="pagination-list">
                        {indiceActual !== 1 && <li><button className="pagination-link" onClick={() => handleTargetPagina(1)}>1</button></li>}
                        {indiceActual > 3 && <li><span className="pagination-ellipsis">&hellip;</span></li>}
                        {indiceActual > 2 && <li><button className="pagination-link" onClick={() => handleTargetPagina(indiceActual - 1)}>{indiceActual - 1}</button></li>}
                        <li><button className="pagination-link is-current" onClick={() => handleTargetPagina(indiceActual)}>{indiceActual}</button></li>
                        {indiceActual < totalPaginas - 1 && <li><button className="pagination-link" onClick={() => handleTargetPagina(indiceActual + 1)}>{indiceActual + 1}</button></li>}
                        {indiceActual < totalPaginas - 2 && <li><span className="pagination-ellipsis">&hellip;</span></li>}
                        {indiceActual !== totalPaginas && <li><button className="pagination-link" onClick={() => handleTargetPagina(totalPaginas)}>{totalPaginas}</button></li>}
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default HistorialCompra;
