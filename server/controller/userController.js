module.exports = connection;



const axios = require('axios');

const userController = {
    guardarUsuario: async function (req, res) {
        const config = {
            method: "GET",
            maxBodyLength: Infinity,
            url: process.env.JSONBIN_URL,
            headers: {
                'Content-Type': 'application/json',
                "X-Master-Key": process.env.MASTER_KEY
            }
        };

        try {
            const result = await axios(config);
            let usuarios = result.data.record;
            const nuevoUsuario = {
                id: usuarios.length + 1,
                identificacion: req.body.identificacion,
                nombres: req.body.nombres,
                apellidos: req.body.apellidos,
                email: req.body.email,
                direccion: req.body.direccion,
                telefono: req.body.telefono,
                password: req.body.password
            };

            const existeUsuario = usuarios.some(user => user.email === req.body.email);

            if (existeUsuario) {
                res.status(400).send("Usuario ya existe en la Base de Datos");
                return;
            }

            usuarios.push(nuevoUsuario);

            const configPut = {
                method: "PUT",
                url: process.env.JSONBIN_URL,
                headers: {
                    'Content-Type': 'application/json',
                    "X-Master-Key": process.env.MASTER_KEY
                },
                data: { record: usuarios },
            };

            const response = await axios(configPut);

            if (response.status === 200) {
                res.status(200).send('Usuario registrado con éxito');
            } else {
                res.status(400).send("No se pudo registrar el usuario");
            }
        } catch (error) {
            console.error('Error al procesar el registro de usuario:', error);
            res.status(500).send('Error interno del servidor');
        }
    },

    iniciarSesion: async function (req, res) {
        const config = {
            method: "GET",
            maxBodyLength: Infinity,
            url: process.env.JSONBIN_URL,
            headers: {
                'Content-Type': 'application/json',
                "X-Master-Key": process.env.MASTER_KEY
            }
        };

        try {
            const result = await axios(config);
            const usuarios = result.data.record;

            const usuario = usuarios.find(user => user.email === req.body.email && user.password === req.body.password);
            if (usuario) {
                res.status(200).send("Inicio de sesión exitoso");
            } else {
                res.status(400).send('Credenciales incorrectas');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            res.status(500).send('Error interno del servidor');
        }
    }
};

module.exports = userController;
