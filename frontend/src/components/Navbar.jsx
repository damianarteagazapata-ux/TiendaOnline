import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const { usuario, logout } = useContext(AuthContext);

    const navigate = useNavigate();
    
    const { carrito } = useContext(CartContext);

    const cerrarSesion = () => {

    logout();

    navigate("/");

};

    const cantidad = carrito.reduce(
        (total, item) => total + item.cantidad,
        0
    );

    return (

<nav className="navbar">

    <div className="navbar-logo">

        <h2>🛒 Tienda Online</h2>

    </div>

    <div className="navbar-links">

        {

            usuario && (

                <>

                    <Link to="/home">Inicio</Link>

                    <Link to="/pedidos">Pedidos</Link>

                    {

                        usuario.rol === "admin" && (

                            <Link to="/admin/productos">

                                Productos

                            </Link>

                        )

                    }

                    {

                        usuario.rol === "admin" && (

                            <Link to="/admin">

                                Dashboard

                            </Link>

                        )

                    }
                    {
                        usuario.rol === "admin" && (
                            <Link to="/usuarios">
                                Usuarios
                            </Link>
                        )
                    }

                </>

            )

        }

    </div>

    <div className="navbar-user">

        {

            usuario ?

            <>

                <span>

                    👤 {usuario.nombre}

                </span>

                <Link to="/carrito">

                    🛒 {cantidad}

                </Link>

                <button
                    className="btn btn-danger"
                    onClick={cerrarSesion}
                >

                    Salir

                </button>

            </>

            :

            <>

                <Link to="/">Login</Link>

                <Link to="/register">Registro</Link>

            </>

        }

    </div>

</nav>

);

}

export default Navbar;