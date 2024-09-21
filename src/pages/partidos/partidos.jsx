import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DetallePartido from '../../components/DetallePartido.jsx';

const Partidos = () => {
    const [partidos, setPartidos] = useState([]);
    const [partidoSeleccionado, setPartidoSeleccionado] = useState(null);

    useEffect(() => {
        const fetchPartidos = async () => {
            try {
                const response = await axios.get('http://localhost:8000/fixtures');
                setPartidos(response.data); // Aquí ya accedemos a la respuesta directamente.
                console.log('Partidos:', response.data);
            } catch (error) {
                console.error('Error al obtener los partidos:', error);
            }
        };

        fetchPartidos();
    }, []);

    return (
        <div>
            <h1>Partidos Disponibles</h1>
            <ul>
                {partidos.map((partido) => (
                    <li key={partido.id} onClick={() => setPartidoSeleccionado(partido)}>
                        {partido.teams.home.name} vs {partido.teams.away.name}
                    </li>
                ))}
            </ul>

            {partidoSeleccionado && (
                <DetallePartido partido={partidoSeleccionado} />
            )}
        </div>
    );
};

export default Partidos;
