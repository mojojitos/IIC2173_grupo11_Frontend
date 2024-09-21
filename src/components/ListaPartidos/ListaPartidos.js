import React from "react";  
import './ListaPartidos.css';

const ListaPartidos = partido.map(partido => 
    <li key={partido.id}>
    {partido.title}
  </li>
);

return (
    <ul>{listPartidos}</ul>
  );