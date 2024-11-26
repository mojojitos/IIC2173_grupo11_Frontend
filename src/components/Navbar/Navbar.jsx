import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import "./Navbar.scss";

const Billetera = () => (
    <Link className="navbar-item" to="/wallet">
        Billetera
    </Link>
);

const Logout = () => {
    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        localStorage.removeItem("TokenJWT");
        window.location.reload();
    };

    return (
        <button className="button is-light" onClick={handleLogout}>
            <strong>Log Out</strong>
        </button>
    );
};

const Login = () => (
    <Link className="button is-light" to="/login">
        <strong>Log In</strong>
    </Link>
);

const HistorialCompra = () => (
    <Link className="navbar-item" to="/historial-compra">
        Historial de Compras
    </Link>
);

const HistorialNotificacion = () => (
    <Link className="navbar-item" to="/historial-notificacion">
        Notificaciones
    </Link>
);

const Recomendaciones = () => (
    <Link className="navbar-item" to="/recomendaciones">
        Recomendaciones
    </Link>
);

const Reservas = () => (
    <Link className="navbar-item" to="/reserva-info">
        Reservas
    </Link>
);

const Subastas = () => (
    <Link className="navbar-item" to="/subastas">
        Subastas
    </Link>
);

const SubastasPublicar = () => (
    <Link className="navbar-item" to="/subastas-publicar">
        Publicar Subastas
    </Link>
);

const Propuestas = () => (
    <Link className="navbar-item" to="/propuestas">
        Propuestas
    </Link>
);

const PropuestasPublicar = () => (
    <Link className="navbar-item" to="/propuestas-publicar">
        Publicar Propuestas
    </Link>
);

function Navbar() {
    const [userId, setUserId] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const storedUserId = localStorage.getItem("user");
        if (storedUserId) {
            setUserId(storedUserId);
        }
        const token = localStorage.getItem("TokenJWT");
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                if (decodedToken.scope && decodedToken.scope.includes("admin")) {
                    setIsAdmin(true);
                }
            } catch (error) {
                console.error("Error al decodificar el token:", error);
            }
        }
    }, []);

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link className="navbar-item" to="/pagina-principal" id="button-logo">
                    <img src="/logo.png" alt="Logo" className="navbar-logo" />
                </Link>
            </div>
            <div className="navbar-divider"></div>
            <div className="navbar-menu">
                <div className="navbar-start">
                    <Link className="navbar-item" to="/pagina-principal">
                        Inicio
                    </Link>
                    <Link className="navbar-item" to="/partidos">
                        Partidos
                    </Link>
                    <Link className="navbar-item" to="/resultados">
                        Resultados
                    </Link>
                    <Link className="navbar-item" to="/arena">
                        Workers
                    </Link>
                    {userId && <Billetera />}
                    {userId && <HistorialNotificacion />}
                    {userId && <HistorialCompra />}
                    {userId && <Recomendaciones />}
                    {userId && isAdmin && <Reservas />}
                    {userId && isAdmin && <Subastas />}
                    {userId && isAdmin && <SubastasPublicar />}
                    {userId && isAdmin && <Propuestas />}
                    {userId && isAdmin && <PropuestasPublicar />}
                </div>
            </div>
            <div className="navbar-end">
                <div className="navbar-item">
                    {!userId && (
                        <Link className="button is-primary" to="/signup">
                            <strong>Sign Up</strong>
                        </Link>
                    )}
                </div>
                <div className="navbar-item">
                    {userId ? <Logout /> : <Login />}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
