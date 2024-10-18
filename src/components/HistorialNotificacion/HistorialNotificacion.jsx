import React, { useState, useEffect } from "react";
import "./HistorialNotificacion.scss";
import axios from "axios";

function HistorialNotificacion() {
    const [notificacionesRecibidas, setNotificacionesRecibidas] = useState([]);
    const [indiceActual, setIndiceActual] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const [tamanoPagina] = useState(10);
    const [UserId, setUserId] = useState(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem("user");
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    useEffect(() => {
        if (UserId) {
            axios.get(`${process.env.REACT_APP_BACKEND_LINK}/showNotifications/${UserId}`)
                .then(response => {
                    setNotificacionesRecibidas(response.data);
                    setTotalPaginas(Math.ceil(response.data.length / tamanoPagina));
                })
                .catch(error => {
                    console.error('Error al obtener las notificaciones recibidas:', error);
                });
        }
    }, [UserId, tamanoPagina]);

    // Lógica para cambiar de página
    const handleSiguientePagina = () => {
        setIndiceActual(prev => prev + 1);
    };

    const handlePaginaAnterior = () => {
        setIndiceActual(prev => prev - 1);
    };

    const handleTargetPagina = (target) => {
        setIndiceActual(target);
    };

    // Obtener notificaciones para la página actual
    const notifsxPagina = notificacionesRecibidas.slice(
        (indiceActual - 1) * tamanoPagina,
        indiceActual * tamanoPagina
    );

    return (
        <div className="container_notificaciones">
            <div>
                <h1 className="title">Centro de Notificaciones</h1>
                <ul>
                    {notifsxPagina
                        .sort((a, b) => new Date(b.date) - new Date(a.date))
                        .map((notif, index) => (
                            <li key={index} className="message">
                                <div className="message-header">
                                    <p>Mensaje recibdo en: {new Date(notif.date).toLocaleString()}</p>
                                </div>
                                <div className="message-body">
                                    <p>{notif.message}</p>
                                </div>
                            </li>
                        ))}
                </ul>
                <nav className="pagination is-right" role="navigation" aria-label="pagination">
                    {indiceActual > 1 && <button className="pagination-previous" onClick={handlePaginaAnterior}>&lt;</button>}
                    {indiceActual < totalPaginas && <button className="pagination-next" onClick={handleSiguientePagina}>&gt;</button>}
                    <ul className="pagination-list">
                        {indiceActual !== 1 && <li><button className="pagination-link" onClick={() => handleTargetPagina(1)}>1</button></li>}
                        {indiceActual > 3 && <li><span className="pagination-ellipsis">&hellip;</span></li>}
                        {indiceActual > 2 && <li><button className="pagination-link" onClick={() => handleTargetPagina(indiceActual - 1)}>{indiceActual - 1}</button></li>}
                        <li><button className="pagination-link is-current">{indiceActual}</button></li>
                        {indiceActual < totalPaginas - 1 && <li><button className="pagination-link" onClick={() => handleTargetPagina(indiceActual + 1)}>{indiceActual + 1}</button></li>}
                        {indiceActual < totalPaginas - 2 && <li><span className="pagination-ellipsis">&hellip;</span></li>}
                        {indiceActual !== totalPaginas && <li><button className="pagination-link" onClick={() => handleTargetPagina(totalPaginas)}>{totalPaginas}</button></li>}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default HistorialNotificacion;
