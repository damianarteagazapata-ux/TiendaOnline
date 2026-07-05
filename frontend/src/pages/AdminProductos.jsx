import { useState } from "react";
import api from "../api/api";
import { useNavigate, useLocation } from "react-router-dom";
import Spinner from "../components/Spinner";

function AdminProductos() {

    const navigate = useNavigate();
    const location = useLocation();

    const productoEditar = location.state;
    const [producto, setProducto] = useState(
        productoEditar || {
            nombre: "",
            descripcion: "",
            precio: "",
            imagen: "",
            stock: "" 
        }
    );
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setProducto({
            ...producto,
            [e.target.name]: e.target.value
        });
    };

    const guardar = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (productoEditar) {
                await api.put(`/productos/${producto.id}`, producto);
                alert("Producto actualizado");
            } else {
                await api.post("/productos", producto);
                alert("Producto creado");
            }

            navigate("/home");
        } catch (error) {
            console.log(error);
            alert("No se pudo guardar el producto");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <form className="login-card" onSubmit={guardar}>
                <input name="nombre" value={producto.nombre} placeholder="Nombre" onChange={handleChange} />
                <input name="descripcion" value={producto.descripcion} placeholder="Descripción" onChange={handleChange} />
                <input name="precio" value={producto.precio} placeholder="Precio" onChange={handleChange} />
                <input name="imagen" value={producto.imagen} placeholder="URL Imagen" onChange={handleChange} />
                <input name="stock" value={producto.stock} placeholder="Stock" onChange={handleChange} />

                <button type="submit" disabled={loading}>
                    {loading ? <Spinner size="sm" label="" inline /> : (productoEditar ? "Actualizar" : "Guardar")}
                </button>
            </form>
        </div>
    );
}

export default AdminProductos;