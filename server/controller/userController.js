const express = require("express");
const app = express();
const axios = require('axios');
const cors = require("cors");
app.use(cors());

const apiConfig = {
    url: 'https://api.jsonbin.io/v3/b/665798dbacd3cb34a84fb7ec',
    headers: {
        'Content-Type': 'application/json',
        "X-Master-Key": "$2a$10$oLeM1xVUsAeQwpsBrvJeY.KONldUcqx6VGgyVDBmuPCOiui1qapAK"
    }
};

const userController = {
    guardarUsuario: async function (req, res) {
        try {
            const { identificacion, nombres, apellidos, email, direccion, telefono, fechaNacimiento, deptoResidencia, municipioResidencia, password } = req.body;

            // Obtener los usuarios registrados desde la API
            const getConfig = { ...apiConfig, method: 'GET' };
            const result = await axios(getConfig);
            let usuariosRegistrados = result.data.record;

            // Verificar si el usuario ya está registrado
            if (usuariosRegistrados.some(user => user.email === email)) {
                return res.status(400).send('Usuario ya existe en la Base de Datos');
            }

            // Agregar el nuevo usuario al arreglo de usuarios registrados
            const usuarioNuevo = {
                id: usuariosRegistrados.length + 1,
                identificacion,
                nombres,
                apellidos,
                email,
                direccion,
                telefono,
                fechaNacimiento,
                deptoResidencia,
                municipioResidencia,
                password,
                estado: "activo",
                rol: "Usuario",
                fecha_creación: new Date(),
            };
            usuariosRegistrados.push(usuarioNuevo);

            // Actualizar los usuarios registrados en la API
            const putConfig = {
                ...apiConfig,
                method: 'PUT',
                data: JSON.stringify({ record: usuariosRegistrados })
            };
            const updateResponse = await axios(putConfig);

            if (updateResponse.status === 200) {
                res.status(200).send('Usuario registrado con éxito');
            } else {
                res.status(400).send('Error al registrar el usuario');
            }
        } catch (error) {
            console.error('Error al procesar el registro de usuario:', error);
            res.status(500).send('Error interno del servidor');
        }
    },

    iniciarSesion: async function (req, res) {
        try {
            const { email, password } = req.body;

            // Obtener los usuarios registrados desde la API
            const getConfig = { ...apiConfig, method: 'GET' };
            const result = await axios(getConfig);
            const usuariosRegistrados = result.data.record;

            // Buscar el usuario en la lista de usuarios registrados
            const usuario = usuariosRegistrados.find(user => user.email === email && user.password === password);

            if (usuario) {
                res.status(200).json(usuario);
            } else {
                res.status(401).json({ error: 'Credenciales incorrectas' });
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
};

module.exports = userController;