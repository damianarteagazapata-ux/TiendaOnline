import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import api from "../api/api";
import Spinner from "../components/Spinner";
function Cart() {

const {
    carrito,
    aumentarCantidad,
    disminuirCantidad,
    eliminarProducto,
    vaciarCarrito
} = useContext(CartContext);
    const [loading, setLoading] = useState(false);

    const total = carrito.reduce(

        (acumulado, item) =>

            acumulado + (item.precio * item.cantidad),

        0

    );
const finalizarCompra = async () => {

    if (carrito.length === 0) {
        alert("No se puede finalizar la compra con el carrito vacío.");
        return;
    }

    setLoading(true);

    try {
        const pedido = {
            total,
            productos: carrito.map(item => ({
                id: item.id,
                cantidad: item.cantidad,
                precio: item.precio
            }))
        };

        const respuesta = await api.post("/pedidos", pedido);
        alert(respuesta.data.mensaje);
        vaciarCarrito();
    } catch (error) {
        console.log(error);

        if (error.response?.data?.mensaje) {
            alert(error.response.data.mensaje);
        } else {
            alert("Error al crear el pedido");
        }
    } finally {
        setLoading(false);
    }
};

    return (

        <div>

            <h1>Mi Carrito</h1>

            {

                carrito.length === 0

                    ?

                    <h2>No hay productos.</h2>

                    :

                    carrito.map(producto => (

<div className="item-carrito" key={producto.id}>

    <img
        src={producto.imagen}
        alt={producto.nombre}
    />

    <div className="item-info">

        <h2>{producto.nombre}</h2>

        <p>

            Precio:

            ${Number(producto.precio).toLocaleString("es-CO")}

        </p>

        <p>

            Subtotal:

            ${(producto.precio * producto.cantidad).toLocaleString("es-CO")}

        </p>

    </div>
<div className="item-controles">

    <button
        className="btn btn-cantidad"
        onClick={() => disminuirCantidad(producto.id)}
    >
        −
    </button>

    <span>{producto.cantidad}</span>

    <button
        className="btn btn-cantidad"
        onClick={() => aumentarCantidad(producto.id)}
    >
        +
    </button>

    <button
        className="btn btn-eliminar"
        onClick={() => eliminarProducto(producto.id)}
    >
        Eliminar
    </button>

</div>

</div>

))

            }

            <h2>

                Total: ${total.toLocaleString()}

            </h2>
            {/* //boton con estilos en azul y blanco, con hover en azul oscuro y blanco */}


            <button
            style={{
                backgroundColor: carrito.length === 0 ? "#6c757d" : "#007bff",
                color: "#fff",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: carrito.length === 0 ? "not-allowed" : "pointer",
                transition: "background-color 0.3s ease"
            }}
            onMouseEnter={(e) => {
                if (carrito.length === 0) return;
                e.target.style.backgroundColor = "#0056b3";
            }}
            onMouseLeave={(e) => {
                if (carrito.length === 0) return;
                e.target.style.backgroundColor = "#007bff";
            }}
            className="btn btn-comprar"
            onClick={finalizarCompra}
            disabled={carrito.length === 0 || loading}
            >
                {loading ? <Spinner size="sm" label="" inline /> : "Finalizar compra"}
</button>
        </div>

    );

}

export default Cart;