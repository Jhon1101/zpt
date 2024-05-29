import React, { useContext } from 'react';
import { DataContext } from '../context/Dataprovider';
const ComprasRealizadas = () => {
    const { compras } = useContext(DataContext);

    return (
        <div className="compras-realizadas">
            <h2>Compras Realizadas</h2>
            <table>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {compras.map((compra, index) => (
                        <tr key={index}>
                            <td>{compra.title}</td>
                            <td>${compra.price}</td>
                            <td>{compra.fecha}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ComprasRealizadas;