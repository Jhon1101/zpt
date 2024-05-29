const express = require('express');
const app = express();

// Middleware para permitir solicitudes CORS desde cualquier origen
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Resto de tu configuración de servidor y rutas aquí...

// Puerto en el que el servidor escuchará las solicitudes
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
console.log(`Servidor escuchando en el puerto ${PORT}`);
});
