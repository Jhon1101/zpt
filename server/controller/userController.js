const axios = require('axios');
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors())

const userController = {
    guardarUsuario: async function (req, res) {
        const config = {
            method: "GET",
            maxBodyLength: Infinity,
            url: 'https://api.jsonbin.io/v3/b/665798dbacd3cb34a84fb7ec',
            headers: {
                'Content-Type': 'application/json',
                "X-Master-Key": "$2a$10$oLeM1xVUsAeQwpsBrvJeY.KONldUcqx6VGgyVDBmuPCOiui1qapAK"
            }
        };

        try {
            const result = await axios(config);
            const usuarios = result.data.record;

            // Verificar si el usuario ya existe
            const existeUsuario = usuarios.some(user => user.email === req.body.email);
            if (existeUsuario) {
                return res.status(400).send("Usuario ya existe en la Base de Datos");
            }

            // Crear nuevo usuario
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

            // Agregar nuevo usuario a la lista
            usuarios.push(nuevoUsuario);

            // Configuración para la solicitud PUT
            const configPut = {
                method: "PUT",
                url: 'https://api.jsonbin.io/v3/b/665798dbacd3cb34a84fb7ec',
                headers: {
                    'Content-Type': 'application/json',
                    "X-Master-Key": "$2a$10$oLeM1xVUsAeQwpsBrvJeY.KONldUcqx6VGgyVDBmuPCOiui1qapAK"
                },
                data: { record: usuarios }
            };

            // Realizar solicitud PUT
            const response = await axios(configPut);
            if (response.status === 200) {
                return res.status(200).send('Usuario registrado con éxito');
            } else {
                return res.status(400).send("No se pudo registrar el usuario");
            }
        } catch (error) {
            console.error('Error al procesar el registro de usuario:', error);
            return res.status(500).send('Error interno del servidor');
        }
    },

    iniciarSesion: async function (req, res) {
        const config = {
            method: "GET",
            maxBodyLength: Infinity,
            url: 'https://api.jsonbin.io/v3/b/665798dbacd3cb34a84fb7ec',
            headers: {
                'Content-Type': 'application/json',
                "X-Master-Key": "$2a$10$oLeM1xVUsAeQwpsBrvJeY.KONldUcqx6VGgyVDBmuPCOiui1qapAK"
            }
        };

        try {
            const result = await axios(config);
            const usuarios = result.data.record;

            // Buscar usuario con las credenciales proporcionadas
            const usuario = usuarios.find(user => user.email === req.body.email && user.password === req.body.password);
            if (usuario) {
                return res.status(200).send("Inicio de sesión exitoso");
            } else {
                return res.status(400).send('Credenciales incorrectas');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            return res.status(500).send('Error interno del servidor');
        }
    }
};

module.exports = userController;