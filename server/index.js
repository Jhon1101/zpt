require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userController = require('./controller/userController');

// Inicializa la aplicación de Express
const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Ruta para obtener todos los usuarios
app.get("/todos-los-usuarios", (req, res) => {
    const query = "SELECT * FROM datos";
    connection.query(query, function (err, result) {
        if (err) {
            console.error('Error al obtener los usuarios:', err);
            res.status(500).send('Error interno del servidor');
            return;
        }
        res.send(result);
    });
});

// Ruta para guardar un usuario
app.post('/guardar-usuario', userController.guardarUsuario);

// Ruta para iniciar sesión
app.post('/iniciar-sesion', userController.iniciarSesion);

// Ruta principal
app.get("/", (req, res) => {
    res.send('Servidor corriendo');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});