const connection = require('../configBD.js');

const userController = {
    guardarUsuario: function (req, res) {
        const { identificacion, nombres, apellidos, email, direccion, telefono, password } = req.body;

        const query = "INSERT INTO datos (identificacion, nombres, apellidos, email, direccion, telefono, password) VALUES (?, ?, ?, ?, ?, ?, ?)";
        connection.query(query, [identificacion, nombres, apellidos, email, direccion, telefono, password], function (error, results) {
            if (error) {
                console.error('Error al guardar el usuario:', error);
                res.status(500).send('Error interno del servidor');
                return;
            }
            res.status(200).send('Usuario registrado con éxito');
        });
    },

    iniciarSesion: function (req, res) {
        const { email, password } = req.body;

        const query = "SELECT * FROM datos WHERE email = ? AND password = ?";
        connection.query(query, [email, password], function (error, results) {
            if (error) {
                console.error('Error al iniciar sesión:', error);
                res.status(500).send('Error interno del servidor');
                return;
            }

            if (results.length > 0) {
                res.status(200).send("Inicio de sesión exitoso");
            } else {
                res.status(400).send('Credenciales incorrectas');
            }
        });
    }
};

module.exports = userController;
