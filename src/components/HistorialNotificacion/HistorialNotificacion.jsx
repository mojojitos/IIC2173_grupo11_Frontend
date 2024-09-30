import React, { useState, useEffect } from "react";
import "./HistorialNotificacion.scss";
import axios from "axios";
import jwtDecode from "jwt-decode";


function HistorialNotificacion() {
    const [notificacionesRecibidas, setNotificacionesRecibidas] = useState([]);
    const [indiceActual, setIndiceActual] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const [tamanoPagina] = useState(10);
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            const decodedToken = jwtDecode(token);
            const id_user = decodedToken.sub;
        axios.get(`http://api-g11:3000/showNotifications/${id_user}`)
        .then(response => {
            setNotificacionesRecibidas(response.data);
            setTotalPaginas(Math.ceil(response.data.length / tamanoPagina));
        })
        .catch(error => {
            console.error('Error al obtener las notificaciones recibidas:', error);
        });
    }
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


    const notifsxPagina = notificacionesRecibidas.slice(
        (indiceActual - 1) * tamanoPagina,
        indiceActual * tamanoPagina
    );


    return(
        <div className="container_notificaciones">
            <div>
                <h1 className="title">Centro de Notificaciones</h1>
                <ul>
                    {notifsxPagina
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map((notif, index) => (
                        <li key={index} className="message is-dark">
                            <div className="message-header">
                                <p>{notif.date}</p>
                            </div>
                            <div className="message-body">
                                <p>{notif.message}</p>
                            </div>
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

export default HistorialNotificacion;