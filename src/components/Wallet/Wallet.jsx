import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Wallet.scss';
import 'bulma/css/bulma.min.css';

const Wallet = () => {
    const [recarga, setRecarga] = useState(0); // Monto De Recarga
    const [monto, setMonto] = useState(''); // Monto Actual

    useEffect(() => {
        axios.get('https://api-g11:3000/getWalletCredit/:id') // Mostrar dinero actual
            .then(response => 
                {setMonto(response.data.monto);
                })
            .catch(error => 
                {console.error('Error al cargar tu monto actual:', error)
                });
    }, []);

    const RecargarCreditos = (event) => {  // Recarga de creditos
        event.preventDefault();
        axios.patch('https://api-g11:3000/wallet', {
            amount: parseInt(recarga)
        })
            .then(response => setRecarga(response.data.monto)) // Probar despues
            .catch(error => console.error('Error al hacer la recarga de creditos', error));
    };

    return (
        <div className="container-center">
            <div className="box">
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