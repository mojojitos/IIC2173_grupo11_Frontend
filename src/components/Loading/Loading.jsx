import React from "react";
import "./Loading.scss";

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p className="loading-text">Cargando...</p>
    </div>
  );
};

export default Loading;
