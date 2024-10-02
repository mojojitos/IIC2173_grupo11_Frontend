import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Wallet.scss';

const Wallet = () => {
    const [recarga, setRecarga] = useState(0); // Monto De Recarga
    const [monto, setMonto] = useState(''); // Monto Actual
    const [UserId, setUserId] = useState(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem("user");
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    useEffect(() => {
        if (UserId) {
            axios.get(`https://grupo11backend.me/getWalletCredit/${UserId}`) // Mostrar dinero actual
                .then(response => {
                    setMonto(response.data.credits);
                })
                .catch(error => {
                    console.error('Error al cargar tu monto actual:', error);
                });
        }
    }, [UserId]); // Se ejecuta cuando `UserId` cambia

    const handleSubmit = async (e) => {  // Recarga de creditos
        e.preventDefault();
        try {
            const response = await axios.patch(`https://grupo11backend.me/wallet`, {
                id: UserId, // Agrega el ID en el cuerpo de la solicitud
                amount: parseInt(recarga)
            });
            console.log('Recarga exitosa:', response.data);
        } catch (error) {
            console.error('Error al hacer la recarga de créditos', error);
        }
    };

    return (
        <div className="container-center">
            <div className="box has-background-black-ter">
                <h1 className="title">Tu Billetera</h1>
                <p className="subtitle">Créditos actuales: {monto}</p>
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <label className="label">Cantidad de créditos a cargar</label>
                        <div className="control">
                            <input
                                className="input"
                                type="number"
                                value={recarga}
                                onChange={(e) => setRecarga(e.target.value)}
                                placeholder="Ingresa aquí el número de créditos"
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
