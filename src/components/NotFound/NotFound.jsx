import React from "react";
import "./NotFound.scss";

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="content">
        <h1>404</h1>
        <p>Oops, la página que buscas no existe.</p>
        <a href="/" className="home-link">Volver al inicio</a>
      </div>
    </div>
  );
};

export default NotFound;
