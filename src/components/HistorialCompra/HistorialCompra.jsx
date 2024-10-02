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
            axios.get(`https://grupo11backend.me/transactions/${userId}`)
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
                            <div className="hero is-small has-background-grey-darker">
                                <div className="hero-body">
                                    <p className="title"> {compra.date_transaction} | Monto: {compra.cost_transaction} </p>
                                    <p className="subtitle"> Home: {compra.home} - Away: {compra.away} </p>
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
