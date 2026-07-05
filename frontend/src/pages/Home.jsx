import { useEffect, useState } from "react";
import api from "../api/api";
import ProductCard from "../components/ProductCard";
import Skeleton from "../components/Skeleton";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [deletingId, setDeletingId] = useState(null);

    const eliminarProducto = async (id) => {
        if (!confirm("¿Eliminar producto?")) return;

        setDeletingId(id);

        try {
            await api.delete(`/productos/${id}`);
            await obtenerProductos();
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.mensaje || "El producto esta asociado a un pedido, no se puede eliminar");
        } finally {
            setDeletingId(null);
        }
    };

    const obtenerProductos = async () => {
        setLoading(true);
        setError("");

        try {
            const respuesta = await api.get("/productos");
            setProductos(respuesta.data);
        } catch (error) {
            console.log(error);
            setError("No se pudieron cargar los productos. Intenta nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        obtenerProductos();
    }, []);

    return (
        <div>
            <h1>Nuestros Productos</h1>

            {loading ? (
                <Skeleton count={6} />
            ) : error ? (
                <div className="state-card error">
                    <p>{error}</p>
                    <button className="btn btn-primary" onClick={obtenerProductos}>Reintentar</button>
                </div>
            ) : (
                <div className="contenedor-productos">
                    {productos.map((producto) => (
                        <div key={producto.id}>
                            <ProductCard producto={producto} />

                            {usuario?.rol === "admin" && (
                                <div className="admin-buttons">
                                    <button
                                        onClick={() => navigate("/admin/productos", { state: producto })}
                                    >
                                        Editar
                                    </button>

                                    <button
                                        onClick={() => eliminarProducto(producto.id)}
                                        disabled={deletingId === producto.id}
                                    >
                                        {deletingId === producto.id ? <Spinner size="sm" label="" inline /> : "Eliminar"}
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home;
