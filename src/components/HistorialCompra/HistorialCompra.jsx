import React, { useState, useEffect } from "react";
import "./HistorialCompra.scss";
import axios from "axios";

function HistorialCompra() {
    const [comprasRealizadas, setComprasRealizadas] = useState([]);
    const [indiceActual, setIndiceActual] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const [tamanoPagina] = useState(8);
    useEffect(() => {
        axios.get('http://api-g11:3000/transactions/:id_user')
        .then(response => {
            setComprasRealizadas(response.data);
            setTotalPaginas(Math.ceil(response.data.lenght / tamanoPagina));
        })
        .catch(error => {
            console.error('Error al obtener el historial de compra;', error);
        });
    }, [tamanoPagina]);

    // Logica para paginacion y cambio de página
    const HandleSiguientePagina = () => {
        const handleClick = () => setIndiceActual(indiceActual + 1);
        return (
            <button className="pagination-next" onClick={handleClick} disabled={indiceActual === totalPaginas}>
                &gt;
            </button>
        )
    };

    const HandlePaginaAnterior = () => {
        const handleClick = () => setIndiceActual(indiceActual - 1);
        return (
            <button className="pagination-previous" onClick={handleClick} disabled={indiceActual === 1}>
                &lt;
            </button>
        )
    };

    const handleTargetPagina = (target) => {
        const handleClick = () => setIndiceActual(target);
        return handleClick;
    };


    const comprasxPagina = comprasRealizadas.slice(
        (indiceActual - 1) * tamanoPagina,
        indiceActual * tamanoPagina
    );


    return(
        <div className="container_compra">
            <div>
                <h1 className="title">Historial de Compras</h1>
                <ul>
                    {comprasxPagina.map((compra, index) => (
                        <li key={index} className="transaccion">
                            {compra.date} - {compra.number_bonus} - {compra.state}
                        </li>
                    ))}
                </ul>
                <nav className="pagination is-right" role="navigation" aria-label="pagination">
                    { (indiceActual > 1) && <HandlePaginaAnterior />}
                    { (indiceActual < totalPaginas) && <HandleSiguientePagina />}
                    <ul className="pagination-list">
                        { (indiceActual !== 1) && <li><button className="pagination-link" onClick={handleTargetPagina(1)}>1</button></li>}
                        { (indiceActual > 3) && <li><span className="pagination-ellipsis">&hellip;</span></li>}
                        { (indiceActual > 2) && <li><button className="pagination-link" onClick={handleTargetPagina(indiceActual -  1)}>{(indiceActual - 1)}</button></li>}
                        <li><button className="pagination-link is-current" onClick={handleTargetPagina(indiceActual)}>{indiceActual}</button></li>
                        { (indiceActual < totalPaginas - 1) && <li><button className="pagination-link" onClick={handleTargetPagina(indiceActual + 1)}>{(indiceActual + 1)}</button></li>}
                        { (indiceActual < totalPaginas - 2) && <li><span className="pagination-ellipsis">&hellip;</span></li>}
                        { (indiceActual !== totalPaginas) && <li><button className="pagination-link" onClick={handleTargetPagina(totalPaginas)}>{totalPaginas}</button></li>}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default HistorialCompra;