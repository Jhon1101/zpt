import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from "../../context/Dataprovider";
import 'boxicons';
import Nike from '../../images/Nike.jpg';

export const Header = () => {
  const { isLoggedIn, logout, carrito, toogleMenu, user } = useContext(DataContext);

  return (
    <header>
      <div className="user-info">
        {isLoggedIn && user && (
          <div className="user-details">
            <span>{user.nombres}</span>
            <span>{user.email}</span>
          </div>
        )}
        <Link to="/">
          <div className="logo">
            <img src={Nike} alt="logo" width="150" />
          </div>
        </Link>
      </div>

      <ul>

      <li>
          <Link to="/">INICIO</Link>
        </li>

        <li>
          <Link to="/productos">PRODUCTOS</Link>
        </li>

        {!isLoggedIn && (
          <>
            <li>
              <Link to="/registro">REGISTRO</Link>
            </li>
            <li>
              <Link to="/iniciar-sesion">INICIAR SESIÓN</Link>
            </li>
          </>
        )}
        
        
        {isLoggedIn && (
          <>
            <li>
              <Link to="/compras">COMPRAS</Link> {/* Nuevo enlace para ver las compras */}
            </li>
            <li>
              <button onClick={logout}>Cerrar Sesión</button>
            </li>
          </>
        )}
      </ul>
      <div className="cart" onClick={toogleMenu}>
        <box-icon name="cart"></box-icon>
        <span className="item_total">{carrito.length}</span>
      </div>
    </header>
  );
};
