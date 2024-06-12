import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsPersonFill, BsEnvelopeFill, BsLockFill } from 'react-icons/bs'; // Importar iconos de Bootstrap Icons
import '../App.css';

const Registro = () => {
  const [usuario, setUsuario] = useState({
    identificacion: '',
    nombres: '',
    apellidos: '',
    email: '',
    direccion: '',
    telefono: '',
    password: '',
    confirmarPassword: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Verificar que las contraseñas coincidan
    if (usuario.password !== usuario.confirmarPassword) {
      alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
      return;
    }

    const usuarioJSON = JSON.stringify(usuario);

    // Actualiza esta URL para que apunte a tu backend desplegado en Render
    fetch('https://tu-backend-url.onrender.com/guardar-usuario', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: usuarioJSON
    })
    .then(response => {
      if (response.ok) {
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
        navigate('/iniciar-sesion');
      } else {
        alert('Error al registrar. Por favor, inténtalo de nuevo.');
      }
    })
    .catch(error => {
      console.error('Error al guardar el registro:', error);
      alert('Error al registrar. Por favor, inténtalo de nuevo.');
    });
  };

  return (
    <div className="registro-container">
      <h2>Registro</h2>
      <form className="registro-form" onSubmit={handleSubmit}>
        <div className="registro-columnas">
          <div className="registro-columna">
            <div className="form-group">
              <label htmlFor="identificacion"><BsPersonFill /> Identificación</label>
              <input type="text" id="identificacion" name="identificacion" value={usuario.identificacion} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="nombres"><BsPersonFill /> Nombres</label>
              <input type="text" id="nombres" name="nombres" value={usuario.nombres} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="apellidos"><BsPersonFill /> Apellidos</label>
              <input type="text" id="apellidos" name="apellidos" value={usuario.apellidos} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="telefono"><BsPersonFill /> Teléfono</label>
              <input type="text" id="telefono" name="telefono" value={usuario.telefono} onChange={handleChange} />
            </div>
          </div>
          <div className="registro-columna">
            <div className="form-group">
              <label htmlFor="email"><BsEnvelopeFill /> Email</label>
              <input type="email" id="email" name="email" value={usuario.email} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="direccion"><BsEnvelopeFill /> Dirección</label>
              <input type="text" id="direccion" name="direccion" value={usuario.direccion} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="password"><BsLockFill /> Contraseña</label>
              <input type="password" id="password" name="password" value={usuario.password} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="confirmarPassword"><BsLockFill /> Confirmar Contraseña</label>
              <input type="password" id="confirmarPassword" name="confirmarPassword" value={usuario.confirmarPassword} onChange={handleChange} />
            </div>
          </div>
        </div>
        <button type="submit" className="btn-registrar">Registrar</button>
      </form>
    </div>
  );
};

export default Registro;
