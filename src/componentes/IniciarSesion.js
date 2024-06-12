import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsEnvelopeFill, BsLockFill } from 'react-icons/bs';
import { DataContext } from "../context/Dataprovider";
import '../App.css';

const IniciarSesion = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(DataContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Actualiza esta URL para que apunte a tu backend desplegado en Render
    fetch('https://tu-backend-url.onrender.com/iniciar-sesion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        alert('Credenciales incorrectas');
      } else {
        alert('Inicio de sesión exitoso');
        login({ email: data.email, nombres: data.nombres });
        navigate('/');
      }
    })
    .catch(error => {
      console.error('Error al iniciar sesión:', error);
      alert('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
    });
  };

  return (
    <div className="inicio-sesion-container">
      <h2>Iniciar Sesión</h2>
      <form className="inicio-sesion-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email"><BsEnvelopeFill /> Email</label>
          <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="password"><BsLockFill /> Contraseña</label>
          <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn-ingresar">Ingresar</button>
      </form>
    </div>
  );
};

export default IniciarSesion;
