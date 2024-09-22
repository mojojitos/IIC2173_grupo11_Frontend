import React from "react";  
import './ListaResultados.css';

const ListaResultados = resultados.map(partido => 
    <li key={partido.id}>
    {partido.title}
  </li>
);

return (
    <ul>{listItems}</ul>
  );

export default ListaResultados;