import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { Inicio } from './Inicio';
import { ProductosLista } from './Productos/index';
import Registro from './Registro';
import IniciarSesion from './IniciarSesion';
import ComprasRealizadas from './ComprasRealizadas';
import { ProductosDatalles } from './Productos/ProductosDatalles';

export const Paginas = () => {
  return (
    <section>
      <nav>
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/productos">Productos</Link>
          </li>
          <li>
            <Link to="/registro">Registro</Link>
          </li>
          <li>
            <Link to="/iniciar-sesion">Iniciar Sesión</Link>
          </li>
          <li>
            <Link to="/compras">Compras</Link> {/* Agrega el enlace en la barra de navegación */}
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/productos" element={<ProductosLista />} />
        <Route path="/productos/:id" element={<ProductosDatalles />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/iniciar-sesion" element={<IniciarSesion />} />
        <Route path="/compras" element={<ComprasRealizadas />} /> {/* Agrega la ruta para ComprasRealizadas */}
      </Routes>
    </section>
  );
};
