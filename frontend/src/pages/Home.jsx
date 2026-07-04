import { useEffect, useState } from "react";
import api from "../api/api";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";

function Home() {


    const navigate = useNavigate();
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    const [productos, setProductos] = useState([]);

    const eliminarProducto = async (id) => {

    if (!confirm("¿Eliminar producto?")) return;

    try {

        await api.delete(`/productos/${id}`);

        obtenerProductos();

    } catch (error) {

        console.log(error);

        alert("Error al eliminar");

    }

};
    const obtenerProductos = async () => {

        try {

            const respuesta = await api.get("/productos");

            setProductos(respuesta.data);

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        obtenerProductos();

    }, []);

    return (

        <div>

            <h1>Nuestros Productos</h1>

            <div className="contenedor-productos">

                {
                    productos.map((producto) => (

<div key={producto.id}>

    <ProductCard
        producto={producto}
    />

{
    usuario?.rol === "admin" && (

        <>
        <div className="admin-buttons">
            <button
                onClick={() =>
                    navigate("/admin/productos", {
                        state: producto
                    })
                }
            >
                Editar
            </button>

            <button
                onClick={() => eliminarProducto(producto.id)}
            >
                Eliminar
            </button>
        </div>
        </>

    )
}

</div>

                    ))
                }

            </div>
                
        </div>

    );

}

export default Home;