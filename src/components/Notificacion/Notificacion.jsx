import React, { useState, useEffect } from "react";
import "./Notificacion.scss";
import axios from "axios";

function Notificacion() {
    const [mostrarNotificacion, setMostrarNotificacion] = useState(false);
    const [mensaje, setMensaje] = useState("");

    useEffect(() => {
        axios.get("http://api-g11:3000/showNotifications/:id_user")
        .then(response => {
            if (response.data.show) {
                setMensaje(response.data.message);
                setMostrarNotificacion(true);
            }
        })
        .catch(error => {
            console.error("Error al obtener el mensaje de la notificación", error);
        });
    },[]);

    return (
        mostrarNotificacion && (
            <div class="notificacion is-info">
                <button class="delete" onClick={() => setMostrarNotificacion(false)}></button>
                {mensaje}
            </div>
        )
    );
};

export default Notificacion;