import React, {useContext, useState, useEffect} from 'react' 
import { DataContext } from "../../context/Dataprovider"; 
import { useParams } from "react-router-dom";


export const ProductosDatalles = () => {
    const value = useContext(DataContext)
    const [productos] = value.productos;
    const [detalle, setDetalle] = useState([])
const params = useParams();
useEffect(() => {
productos.forEach (producto =>{
console.log(producto.id, params.id)
if(producto.id === params.id){
setDetalle (producto)
}
})
}, [params.id, productos])

return (
    <div>
        <h1>Datalles del Producto</h1>
    </div>
)
}
