import React, { useContext, useState } from 'react';
import { DataContext } from '../../context/Dataprovider';

export const Carrito = () => {
    const { menu, setMenu, carrito, setCarrito, removeItem } = useContext(DataContext);
    const [compraExitosa, setCompraExitosa] = useState(false);

    const toggleMenu = () => {
        setMenu(!menu);
    };

    const calcularTotal = () => {
        return carrito.reduce((total, item) => total + item.price * item.cantidad, 0);
    };

    const aumentarCantidad = (id) => {
        const updatedCarrito = carrito.map(item =>
            item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
        setCarrito(updatedCarrito);
    };

    const disminuirCantidad = (id) => {
        const updatedCarrito = carrito.map(item =>
            item.id === id && item.cantidad > 1 ? { ...item, cantidad: item.cantidad - 1 } : item
        );
        setCarrito(updatedCarrito);
    };

    const comprar = () => {
        console.log("Compra realizada:", carrito);
        setMenu(false); // Cerrar el carrito después de la compra
        setCompraExitosa(true);
        // Implementa cualquier otra lógica necesaria después de la compra
    };

    return (
        <div className={menu ? "carritos show" : "carritos"}>
            <div className={menu ? "carrito show" : "carrito"}>
                <div className="carrito__close" onClick={toggleMenu}>
                    <box-icon name="x"></box-icon>
                </div>
                <h2>Su carrito</h2>
                <div className="carrito__center">
                    {carrito.map(item => (
                        <div key={item.id} className="carrito__item">
                            <img src={item.image} alt={item.title} />
                            <div className="carrito__details">
                                <h3>{item.title}</h3>
                                <p className="price">${item.price}</p>
                                <div className="cantidad">
                                    <button onClick={() => disminuirCantidad(item.id)}>-</button>
                                    <span>{item.cantidad}</span> {/* Mostrar la cantidad actual */}
                                    <button onClick={() => aumentarCantidad(item.id)}>+</button>
                                </div>
                                <button onClick={() => removeItem(item.id)} className="btn btn-danger">
                                    <i className="bi bi-trash"></i> Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                    <button onClick={comprar} className="btn btn-success">Comprar</button>
                    {compraExitosa && <p>¡Compra realizada con éxito!</p>}
                </div>         
            </div>
        </div>
    );
};
