import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Wallet.scss';
// import { jwtDecode } from "jwt-decode";

const Wallet = () => {
    const [recarga, setRecarga] = useState(0); // Monto De Recarga
    const [monto, setMonto] = useState(''); // Monto Actual
    const [UserId, setUserId] = useState(null);

    useEffect(() => {
        // const token = localStorage.getItem('accessToken');
        // if (token) {
            // const decodedToken = jwtDecode(token);
            // const id_user = decodedToken.sub;
        const storedUserId = localStorage.getItem("user");
        if (storedUserId) {
            setUserId(storedUserId);
        };

        axios.get(`https://grupo11backend.me/getWalletCredit/${UserId}`) // Mostrar dinero actual
            .then(response => 
                {setMonto(response.data.monto);
                })
            .catch(error => 
                {console.error('Error al cargar tu monto actual:', error)
                });
    }, []);

    const RecargarCreditos = (event) => {  // Recarga de creditos
        event.preventDefault();
        axios.patch('https://grupo11backend.me/wallet', {
            amount: parseInt(recarga)
        })
            .then(response => setRecarga(response.data.monto)) // Probar despues
            .catch(error => console.error('Error al hacer la recarga de creditos', error));
    };

    return (
        <div className="container-center">
            <div className="box has-background-black-ter">
                <h1 className="title">Tu Billetera</h1>
                <p className="subtitle">Créditos actuales: {monto}</p>
                <form onSubmit={RecargarCreditos}>
                    <div className="field">
                        <label className="label">Cantidad de creditos a cargar</label>
                        <div className="control">
                            <input
                                className="input"
                                type="number"
                                value={recarga}
                                onChange={(e) => setRecarga(e.target.value)}
                                placeholder="Ingresa aqui el número de creditos"
                            />
                        </div>
                    </div>
                    <div className="control">
                        <button className="button is-primary" type="submit">Cargar Créditos</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Wallet;