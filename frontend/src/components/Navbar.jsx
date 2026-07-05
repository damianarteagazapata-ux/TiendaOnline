import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

function Navbar() {

    const { usuario, logout } = useContext(AuthContext);
    const { carrito } = useContext(CartContext);

    const navigate = useNavigate();

    const cantidad = carrito.reduce(
        (total, item) => total + item.cantidad,
        0
    );

    const cerrarSesion = () => {

        logout();
        navigate("/");

    };

    return (

        <aside className="sidebar">

            <div className="sidebar-logo">

                <h2>🛒</h2>

                <span>Tienda Online</span>

            </div>

            {

                usuario ?

                <>

                    <div className="sidebar-user">

                        <div className="avatar">

                            {usuario.nombre.charAt(0).toUpperCase()}

                        </div>

                        <h3>{usuario.nombre}</h3>

                        <p>{usuario.rol}</p>

                    </div>

                    <nav className="sidebar-menu">

                        <Link to="/home">
                            🏠 Inicio
                        </Link>

                        <Link to="/pedidos">
                            📦 Pedidos
                        </Link>

                        <Link to="/carrito">
                            🛒 Carrito ({cantidad})
                        </Link>

                        {

                            usuario.rol === "admin" &&

                            <>

                                <Link to="/admin">
                                    📊 Dashboard
                                </Link>

                                <Link to="/admin/productos">
                                    📦 Productos
                                </Link>

                                <Link to="/usuarios">
                                    👥 Usuarios
                                </Link>

                            </>

                        }

                    </nav>

                    <button
                        className="btn-salir"
                        onClick={cerrarSesion}
                    >

                        🚪 Cerrar sesión

                    </button>

                </>

                :

                <nav className="sidebar-menu">

                    <Link to="/">
                        🔑 Login
                    </Link>

                    <Link to="/register">
                        📝 Registro
                    </Link>

                </nav>

            }

        </aside>

    );

}

export default Navbar;