import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Wallet.scss';

const Wallet = () => {
    const [recarga, setRecarga] = useState(0); 
    const [monto, setMonto] = useState(''); // Monto Actual
    const [userId, setUserId] = useState(null);
    const [status, setStatus] = useState('');
    const [webpayData, setWebpayData] = useState({ token: null, url: null });
    const [isLoading, setIsLoading] = useState(false); // Estado para manejar las solicitudes duplicadas

    useEffect(() => {
        const storedUserId = localStorage.getItem("user");
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    useEffect(() => {
        if (userId) {
            axios.get(`${process.env.REACT_APP_BACKEND_LINK}/getWalletCredit/${userId}`) // Mostrar dinero actual
                .then(response => {
                    setMonto(response.data.credits);
                })
                .catch(error => {
                    console.error('Error al cargar tu monto actual:', error);
                });
        }
    }, [userId]); // Se ejecuta cuando `userId` cambia

    const handleRecarga = async (e) => {  // Iniciar recarga con Webpay
        e.preventDefault();
        if (isLoading) return; // Prevenir múltiples solicitudes

        setIsLoading(true); // Marcar como "en proceso"
        try {
            // Guardar el monto en el localStorage antes de redirigir
            localStorage.setItem("recargaAmount", recarga);

            const requestData = {
                userId: userId,
                amount: parseInt(recarga),
            };

            const response = await axios.patch(`${process.env.REACT_APP_BACKEND_LINK}/webpay/recharge`, requestData);

            if (response.data && response.data.token && response.data.url) {
                setStatus("Redirigiendo a WebPay...");
                setWebpayData({
                    token: response.data.token,
                    url: response.data.url,
                });

                // Utilizar un timeout para dar tiempo a mostrar el estado antes de redirigir
                setTimeout(() => {
                    document.getElementById("webpay-form").submit();
                }, 1000);
            } else {
                setStatus("Error al procesar la recarga");
            }

        } catch (error) {
            setStatus("Error al iniciar la recarga de créditos");
            console.error('Error al iniciar la recarga de créditos', error);
        } finally {
            setIsLoading(false); // Resetear el estado cuando la solicitud termine
        }
    };

    return (
        <div className="container-center">
            <div className="box has-background-black-ter">
                <h1 className="title">Tu Billetera</h1>
                <p className="subtitle">Créditos actuales: {monto}</p>
                <form onSubmit={handleRecarga}>
                    <div className="field">
                        <label className="label">Cantidad de créditos a cargar</label>
                        <div className="control">
                            <input
                                className="input"
                                type="number"
                                value={recarga}
                                onChange={(e) => setRecarga(e.target.value)}
                                placeholder="Ingresa aquí el número de créditos"
                                required
                                disabled={isLoading} // Deshabilitar el input mientras se procesa la solicitud
                            />
                        </div>
                    </div>
                    <div className="control">
                        <button 
                            className="button is-primary" 
                            type="submit"
                            disabled={isLoading} // Deshabilitar el botón mientras se procesa la solicitud
                        >
                            {isLoading ? 'Procesando...' : 'Recargar con Webpay'}
                        </button>
                    </div>
                </form>
                {status && (
                    <p className={`status ${status.includes("exitosa") ? "success" : "error"}`}>
                        {status}
                    </p>
                )}

                {webpayData.url && (
                    <form id="webpay-form" action={webpayData.url} method="POST">
                        <input type="hidden" name="token_ws" value={webpayData.token} />
                    </form>
                )}
            </div>
        </div>
    );
};

export default Wallet;
