const axios = require('axios');

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
            let usuariosRegistrados = result.data.record;

            const { identificacion, nombres, apellidos, email, direccion, telefono, password } = req.body;

            const usuarioExistente = usuariosRegistrados.find(user => user.email === email);
            if (usuarioExistente) {
                return res.status(400).send("Usuario ya existe en la Base de Datos");
            }

            const nuevoUsuario = {
                id: usuariosRegistrados.length + 1,
                identificacion,
                nombres,
                apellidos,
                email,
                direccion,
                telefono,
                password,
                fecha_creacion: new Date().toISOString()
            };

            usuariosRegistrados.push(nuevoUsuario);

            const putConfig = {
                method: "PUT",
                url: 'https://api.jsonbin.io/v3/b/665798dbacd3cb34a84fb7ec',
                headers: {
                    'Content-Type': 'application/json',
                    "X-Master-Key": "$2a$10$oLeM1xVUsAeQwpsBrvJeY.KONldUcqx6VGgyVDBmuPCOiui1qapAK"
                },
                data: { record: usuariosRegistrados }
            };

            const putResult = await axios(putConfig);

            if (putResult.status === 200) {
                res.status(200).send('Usuario registrado con éxito');
            } else {
                res.status(500).send('Error al guardar el usuario');
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
            url: 'https://api.jsonbin.io/v3/b/665798dbacd3cb34a84fb7ec',
            headers: {
                'Content-Type': 'application/json',
                "X-Master-Key": "$2a$10$oLeM1xVUsAeQwpsBrvJeY.KONldUcqx6VGgyVDBmuPCOiui1qapAK"
            }
        };

        try {
            const result = await axios(config);
            const usuariosRegistrados = result.data.record;
            const { email, password } = req.body;

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