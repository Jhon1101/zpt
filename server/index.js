const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios'); // Importar Axios
const userController = require('./controller/userController'); // Asegúrate de tener este archivo y el método necesario

const app = express();
const PORT = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Ruta para guardar un usuario
app.post('/guardar-usuario', userController.guardarUsuario);

// Ruta para iniciar sesión
app.post('/iniciar-sesion', userController.iniciarSesion);

// app.get('/usuariosRegistrados.json', (req, res) => {
//     res.sendFile(path.join(__dirname, 'src', 'componentes', 'usuariosRegistrados.json'));
// });

app.get("/", (req, res) => {
    const config = {
        method: "GET",
        maxBodyLength: Infinity,
        url: 'https://api.jsonbin.io/v3/b/665798dbacd3cb34a84fb7ec',
        headers: {
            'Content-Type': 'application/json',
            "X-Master-Key": "$2a$10$oLeM1xVUsAeQwpsBrvJeY.KONldUcqx6VGgyVDBmuPCOiui1qapAK"
        }
    };

    axios(config)
        .then(result => {
            res.send(result.data.record);
            // Si `result.data.record` no es correcto, puedes enviar solo `result.data` o ajustar según la estructura del JSON recibido.
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('');
        });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
