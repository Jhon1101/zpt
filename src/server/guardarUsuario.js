const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

// Habilitar CORS para todas las solicitudes
app.use(cors());

// Middleware para analizar JSON en las solicitudes entrantes
app.use(express.json());

// Ruta para guardar un nuevo usuario
app.post('/guardar-usuario', (req, res) => {
  const nuevoUsuario = req.body;

  fs.readFile('usuariosRegistrados.json', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo de usuarios registrados:', err);
      res.status(500).send('Error interno del servidor');
      return;
    }

    let usuariosRegistrados = JSON.parse(data);
    usuariosRegistrados.push(nuevoUsuario);

    fs.writeFile('usuariosRegistrados.json', JSON.stringify(usuariosRegistrados, null, 2), (err) => {
      if (err) {
        console.error('Error al guardar el nuevo usuario:', err);
        res.status(500).send('Error interno del servidor');
        return;
      }

      res.status(200).send('Usuario registrado exitosamente');
    });
  });
});

// Puerto en el que el servidor escuchará las solicitudes
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
