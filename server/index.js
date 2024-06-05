const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userController = require('./controller/userController'); // Asegúrate de que la ruta sea correcta

const app = express();
const PORT = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.post('/guardar-usuario', userController.guardarUsuario);
app.post('/iniciar-sesion', userController.iniciarSesion);

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
