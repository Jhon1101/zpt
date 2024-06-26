require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userController = require('./controller/userController');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.post('/guardar-usuario', userController.guardarUsuario);
app.get('/todos-los-usuarios', userController.obtenerUsuarios);
app.post('/iniciar-sesion', userController.iniciarSesion);

app.get("/", (req, res) => {
    res.send("API funcionando");
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
