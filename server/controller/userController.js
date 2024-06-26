const connection = require('../configBD');

const userController = {
    guardarUsuario: (req, res) => {
        const { identificacion, nombres, apellidos, email, direccion, telefono, password } = req.body;

        const query = `INSERT INTO datos (identificacion, nombres, apellidos, email, direccion, telefono, password) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        connection.query(query, [identificacion, nombres, apellidos, email, direccion, telefono, password], (error, results) => {
            if (error) {
                console.error('Error al guardar el usuario:', error);
                res.status(500).send('Error al guardar el usuario');
            } else {
                res.status(200).send('Usuario registrado con éxito');
            }
        });
    },

    obtenerUsuarios: (req, res) => {
        const query = 'SELECT * FROM datos';
        connection.query(query, (error, results) => {
            if (error) {
                console.error('Error al obtener los usuarios:', error);
                res.status(500).send('Error al obtener los usuarios');
            } else {
                res.status(200).json(results);
            }
        });
    },

    iniciarSesion: (req, res) => {
        const { email, password } = req.body;
        const query = `SELECT * FROM datos WHERE email = ? AND password = ?`;
        connection.query(query, [email, password], (error, results) => {
            if (error) {
                console.error('Error al iniciar sesión:', error);
                res.status(500).send('Error al iniciar sesión');
            } else if (results.length > 0) {
                res.status(200).send('Inicio de sesión exitoso');
            } else {
                res.status(400).send('Credenciales incorrectas');
            }
        });
    }
};

module.exports = userController;
