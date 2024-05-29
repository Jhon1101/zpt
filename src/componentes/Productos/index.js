import React, { useContext } from "react";
import { DataContext } from "../../context/Dataprovider";
import ProductoItem from './ProductoItem';

export const ProductosLista = () => {
  const value = useContext(DataContext);
  const { productos } = value;

  if (!productos || productos.length === 0) {
    return <div>Cargando...</div>; // O cualquier otro indicador de carga que desees mostrar
  }

  return (
    <>
      <h1 className="title">PRODUCTOS</h1>
      <div className="productos">
        {productos.map((producto) => (
          <ProductoItem
            key={producto.id}
            id={producto.id}
            title={producto.title}
            price={producto.price}
            image={producto.image}
            category={producto.category}
            cantidad={producto.cantidad}
          />
        ))}
      </div>
    </>
  );
};
