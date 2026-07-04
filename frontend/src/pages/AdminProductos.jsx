import { useState } from "react";
import api from "../api/api";
import { useNavigate, useLocation } from "react-router-dom";

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

    const handleChange = (e) => {

        setProducto({

            ...producto,

            [e.target.name]: e.target.value

        });

    };

    const guardar = async (e) => {

    e.preventDefault();

    try {

        if (productoEditar) {

            await api.put(

                `/productos/${producto.id}`,

                producto

            );

            alert("Producto actualizado");

        } else {

            await api.post(

                "/productos",

                producto

            );

            alert("Producto creado");

        }

        navigate("/home");

    } catch (error) {

        console.log(error);

    }

};

    return (
        // centrado con boostrap 
        <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <form className="login-card" onSubmit={guardar}>

            <input
                name="nombre"
                value={producto.nombre}
                placeholder="Nombre"
                onChange={handleChange}
            />

            <input
                name="descripcion"
                value={producto.descripcion}
                placeholder="Descripción"
                onChange={handleChange}
            />

            <input
                name="precio"
                value={producto.precio}
                placeholder="Precio"
                onChange={handleChange}
            />

            <input
                name="imagen"
                value={producto.imagen}
                placeholder="URL Imagen"
                onChange={handleChange}
            />

            <input
                name="stock"
                value={producto.stock}
                placeholder="Stock"
                onChange={handleChange}
            />

<button>

    {productoEditar ? "Actualizar" : "Guardar"}

</button>

        </form>
        </div>
    );

}

export default AdminProductos;