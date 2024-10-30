# Integración de Webpay con Transbank SDK

Esta guía explica el proceso de integración con Webpay usando el SDK de Transbank en Node.js, incluyendo los pasos necesarios en el backend y frontend, así como la comunicación con el broker para manejar el estado de cada transacción.

## Instalación

Para instalar la última versión del SDK de Webpay, ejecuta:
```
npm install transbank-sdk
```

Desde la versión `3.x.x`, el SDK debe configurarse en el backend:

```
const { WebpayPlus, Options, IntegrationCommerceCodes, IntegrationApiKeys, Environment } = require('transbank-sdk');
const tx = new WebpayPlus.Transaction(
    new Options(IntegrationCommerceCodes.WEBPAY_PLUS, IntegrationApiKeys.WEBPAY, Environment.Integration)
);
```

## Creación de la Transacción

Para iniciar una transacción:

1. **buyOrder**: `orden_compra_{fecha_actual}` (Ejemplo: `orden_compra_1698663960000`)
2. **sessionId**: se genera un `requestId` con `uuidv4()` y se utiliza como `sessionId`.
3. **amount**: se calcula multiplicando el valor de un bono (`1000`) por la cantidad de bonos (`quantity`).
4. **returnUrl**: URL de retorno al frontend para manejar el resultado de la compra.

### Código de Ejemplo

```
const requestId = uuidv4();
const buyOrder = `orden_compra_${Date.now()}`;
const sessionId = `${requestId}`;
const amount = 1000 * quantity;
const returnUrl = `${process.env.REACT_APP_FRONTEND_LINK}/webpay/${requestId}`;

const response = await tx.create(buyOrder, sessionId, amount, returnUrl);
```

A partir del `response` se obtiene:
- **token**: el token de la transacción.
- **url**: la URL de redirección para Webpay.

Envía la información de la compra al broker:
```
publishToBroker('fixtures/requests', message);
```

## Envío de Información al Frontend

El frontend utiliza un formulario oculto para enviar la información a Webpay:

```
<form id="webpay-form" action={webpayData.url} method="POST">
    <input type="hidden" name="token_ws" value={webpayData.token} />
</form>
```

En el backend, envía la información necesaria:
```
const response = await axios.post(
    `${process.env.REACT_APP_BACKEND_LINK}/webpay/pay`,
    requestData
);
```

El frontend recibe el token y la URL de redirección, que se configuran y envían al formulario:
```
setWebpayData({
    token: response.data.token,
    url: response.data.url,
});
setTimeout(() => {
    document.getElementById("webpay-form").submit();
}, 1000);
```

## Confirmación de la Transacción

Una vez finalizada la transacción, Webpay redirige al frontend a la URL de retorno especificada. Posteriormente, el frontend envía la información recibida al backend para la confirmación final:

```
const response = await axios.post(
    `${process.env.REACT_APP_BACKEND_LINK}/webpay/confirm/${requestId}`,
    {
        token_ws: tokenWs,
        userId: userId 
    }
);
```

### Procesamiento de la Respuesta en el Backend

1. Si `token_ws` es `null`, la compra fue anulada:
    ```
    const message = {
        request_id: requestId,
        group_id: "11",
        seller: 0,
        valid: false,
    };
    publishToBroker('fixtures/validation', message);
    ```

2. Si la respuesta es `0`, la compra fue exitosa:
    ```
    const message = {
        request_id: requestId,
        group_id: "11",
        seller: 0,
        valid: true,
    };
    publishToBroker('fixtures/validation', message);
    ```

3. En cualquier otro caso, la compra fue rechazada:
    ```
    const message = {
        request_id: requestId,
        group_id: "11",
        seller: 0,
        valid: false,
    };
    publishToBroker('fixtures/validation', message);
    ```

En cada caso, se devuelve `request_id` y un mensaje de estado: anulada, rechazada o exitosa.

## Manejo del Resultado en el Frontend

El frontend maneja la respuesta de Webpay y redirige a un endpoint específico según el estado de la transacción (`resultado/:state/:requestId`). Los posibles resultados son:

- **Éxito**: se muestra información de la compra aprobada.
- **Anulada/Rechazada/Error**: se muestra un mensaje correspondiente al estado de la transacción.

## Manejo de Wallet

El proceso de integración de Webpay para el manejo de **wallet** es similar al flujo de transacciones estándar, con algunas diferencias clave:

1. **Sin comunicación con el broker**: En este caso, no se envía la información de la transacción al broker.
2. **Redirección específica**: La redirección posterior a la transacción se configura para dirigir nuevamente al usuario a la sección `/wallet` en el frontend.
