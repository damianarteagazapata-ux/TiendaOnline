import { useContext } from "react";
import { CartContext } from "../context/CartContext";


function ProductCard({ producto }) {

    const { agregarCarrito } = useContext(CartContext);

    return (
        <div className="card">

           <img
    src={producto.imagen}
    alt={producto.nombre}
    loading="lazy"
/>

            <h2>{producto.nombre}</h2>

            <p>{producto.descripcion}</p>

<h3>

${Number(producto.precio).toLocaleString("es-CO")}

</h3>

            <button onClick={() => agregarCarrito(producto)}>
                Agregar al carrito
            </button>

        </div>
    );

}

export default ProductCard;