require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const userController = require('./controller/userController');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Ruta para guardar un usuario
app.post('/guardar-usuario', userController.guardarUsuario);

// Ruta para iniciar sesión
app.post('/iniciar-sesion', userController.iniciarSesion);

app.get("/", (req, res) => {
    const config = {
        method: "GET",
        maxBodyLength: Infinity,
        url: process.env.JSONBIN_URL,
        headers: {
            'Content-Type': 'application/json',
            "X-Master-Key": process.env.MASTER_KEY
        }
    };

    axios(config)
        .then(result => {
            res.send(result.data.record);
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Error al obtener los datos');
        });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
