import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Wallet.scss';
import 'bulma/css/bulma.min.css';

const Wallet = () => {
    const [credits, setCredits] = useState(0);
    const [amount, setAmount] = useState('');

    useEffect(() => {
        // Llamada al backend para obtener los créditos actuales usando Axios
        axios.get('https://tu-backend.com/api/credits')
            .then(response => setCredits(response.data.credits))
            .catch(error => console.error('Error fetching credits:', error));
    }, []);

    const handleLoadCredits = (event) => {
        event.preventDefault();
        // Llamada al backend para cargar más créditos usando Axios
        axios.post('https://tu-backend.com/api/load-credits', {
            amount: parseInt(amount)
        })
            .then(response => setCredits(response.data.newCredits))
            .catch(error => console.error('Error loading credits:', error));
    };

    return (
        <div className="container">
            <div className="notification">
                <h1 className="title">Billetera</h1>
                <p className="subtitle">Créditos actuales: {credits}</p>
                <form onSubmit={handleLoadCredits}>
                    <div className="field">
                        <label className="label">Cantidad a cargar</label>
                        <div className="control">
                            <input
                                className="input"
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="Ingrese la cantidad"
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