const fs = require('fs').promises;
const path = require('path');

const usuariosRegistradosFilePath = path.join(__dirname, '../../src/componentes/usuariosRegistrados.json');

const userController = {
    guardarUsuario: async function (req, res) {
        try {
            // Recibir los datos del usuario desde el cuerpo de la solicitud
            const { identificacion, nombres, apellidos, email, direccion, telefono, password } = req.body;

            // Leer el archivo JSON una sola vez
            const usuariosRegistradosData = await fs.readFile(usuariosRegistradosFilePath, 'utf-8');
            let usuariosRegistrados = JSON.parse(usuariosRegistradosData);

            // Validar los datos del usuario (puedes implementar tus propias reglas de validación aquí)

            // Agregar el nuevo usuario al arreglo de usuarios registrados
            usuariosRegistrados.push({
                identificacion,
                nombres,
                apellidos,
                email,
                direccion,
                telefono,
                password
            });

            // Escribir el archivo JSON actualizado
            await fs.writeFile(usuariosRegistradosFilePath, JSON.stringify(usuariosRegistrados, null, 4));

            res.status(200).send('Usuario registrado con éxito');
        } catch (error) {
            console.error('Error al procesar el registro de usuario:', error);
            res.status(500).send('Error interno del servidor');
        }
    },

    iniciarSesion: async function (req, res) {
        try {
            const { email, password } = req.body;

            // Aquí deberías verificar las credenciales del usuario en tu base de datos u otro almacenamiento seguro
            // Por ahora, simularemos que encontramos el usuario
            const usuario = {
                email: 'usuario@example.com',
                password: 'contraseña'
            };

            // Verifica las credenciales
            if (email === usuario.email && password === usuario.password) {
                // Si las credenciales son correctas, devuelve los datos del usuario en formato JSON
                res.status(200).json(usuario);
            } else {
                // Si las credenciales son incorrectas, devuelve un mensaje de error
                res.status(401).json({ error: 'Credenciales incorrectas' });
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
};

module.exports = userController;
