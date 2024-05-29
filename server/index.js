const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path'); // Importa el módulo 'path'
const userController = require('./controller/userController');

const app = express();
const PORT = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Ruta para guardar un usuario
app.post('/guardar-usuario', userController.guardarUsuario);

app.get('/usuariosRegistrados.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'componentes', 'usuariosRegistrados.json'));
});


// Aquí debes agregar el método `registrarUsuario` al controlador y registrar la ruta '/registro'

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
