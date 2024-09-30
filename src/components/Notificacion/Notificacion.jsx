import React from "react";
import "./Notificacion.scss";

function Notificacion() {
    return (
        <div className="notificacion is-info">
            <button className="delete"></button>
            ¡Partido Ganado! Has obtenido XXX creditos.
        </div>
    );
};

export default Notificacion;