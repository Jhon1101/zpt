// AuthProvider.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext(); // Define el contexto

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para el inicio de sesión

  const handleLogin = () => {
    setIsLoggedIn(true); // Lógica para iniciar sesión
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Lógica para cerrar sesión
  };

  // Proporciona el estado de inicio de sesión y las funciones de inicio y cierre de sesión a través del contexto
  return (
    <AuthContext.Provider value={{ isLoggedIn, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
