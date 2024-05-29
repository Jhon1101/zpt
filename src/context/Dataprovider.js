import React, { useState, useEffect, createContext } from "react";
import Data from '../Data.js';

export const DataContext = createContext();

export const DataProvider = (props) => {
    const [productos, setProductos] = useState([]);
    const [menu, setMenu] = useState(false);
    const [carrito, setCarrito] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [compras, setCompras] = useState([]);

    useEffect(() => {
        const producto = Data.items;
        if (producto) {
            setProductos(producto);
        } else {
            setProductos([]);
        }
    }, []);

    useEffect(() => {
        const carritoData = JSON.parse(localStorage.getItem('carrito'));
        if (carritoData) {
            setCarrito(carritoData);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }, [carrito]);

    const addCarrito = (id) => {
        const existingItem = carrito.find(item => item.id === id);
        if (existingItem) {
            const updatedCarrito = carrito.map(item =>
                item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
            );
            setCarrito(updatedCarrito);
        } else {
            const data = productos.find(producto => producto.id === id);
            setCarrito([...carrito, { ...data, cantidad: 1 }]);
        }
    };

    const removeItem = (id) => {
        const updatedCarrito = carrito.filter(item => item.id !== id);
        setCarrito(updatedCarrito);
    };

    const login = (user) => {
        setIsLoggedIn(true);
        setUser(user);
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
    };

    const toogleMenu = () => {
        setMenu(!menu);
    };

    const comprar = () => {
        const compraActual = carrito.map(item => ({
            ...item,
            fecha: new Date().toLocaleString()
        }));
        setCompras([...compras, ...compraActual]);
        setCarrito([]); // Vaciar el carrito después de la compra
        setMenu(false); // Cerrar el carrito
    };

    const value = {
        productos,
        menu,
        setMenu,
        addCarrito,
        carrito,
        setCarrito,
        removeItem,
        isLoggedIn,
        login,
        logout,
        user,
        toogleMenu,
        compras,
        comprar
    };

    return (
        <DataContext.Provider value={value}>
            {props.children}
        </DataContext.Provider>
    );
};
