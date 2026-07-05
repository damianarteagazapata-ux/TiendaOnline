import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

function Navbar() {

    const { usuario, logout } = useContext(AuthContext);
    const { carrito } = useContext(CartContext);

    const navigate = useNavigate();
    const location = useLocation();
    const [menuAbierto, setMenuAbierto] = useState(false);

    const cantidad = carrito.reduce(
        (total, item) => total + item.cantidad,
        0
    );

    useEffect(() => {
        setMenuAbierto(false);
    }, [location.pathname]);

    useEffect(() => {
        const cerrarAlResize = () => {
            if (window.innerWidth >= 768) {
                setMenuAbierto(false);
            }
        };

        const cerrarAlEscape = (event) => {
            if (event.key === "Escape") {
                setMenuAbierto(false);
            }
        };

        window.addEventListener("resize", cerrarAlResize);
        window.addEventListener("keydown", cerrarAlEscape);

        return () => {
            window.removeEventListener("resize", cerrarAlResize);
            window.removeEventListener("keydown", cerrarAlEscape);
        };
    }, []);

    const cerrarSesion = () => {
        logout();
        setMenuAbierto(false);
        navigate("/");
    };

    const cerrarMenu = () => setMenuAbierto(false);
    const alternarMenu = () => setMenuAbierto((prev) => !prev);

    return (
        <>
            <button
                type="button"
                className="mobile-menu-toggle"
                onClick={alternarMenu}
                aria-label={menuAbierto ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
                aria-expanded={menuAbierto}
                aria-controls="sidebar-nav"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            {menuAbierto && (
                <button
                    type="button"
                    className="sidebar-backdrop"
                    onClick={cerrarMenu}
                    aria-label="Cerrar menú de navegación"
                />
            )}

            <aside id="sidebar-nav" className={`sidebar ${menuAbierto ? "open" : ""}`}>

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

                            <Link to="/home" onClick={cerrarMenu}>
                                🏠 Inicio
                            </Link>

                            <Link to="/pedidos" onClick={cerrarMenu}>
                                📦 Pedidos
                            </Link>

                            <Link to="/carrito" onClick={cerrarMenu}>
                                🛒 Carrito ({cantidad})
                            </Link>

                            {

                                usuario.rol === "admin" &&

                                <>

                                    <Link to="/admin" onClick={cerrarMenu}>
                                        📊 Dashboard
                                    </Link>

                                    <Link to="/admin/productos" onClick={cerrarMenu}>
                                        📦 Productos
                                    </Link>

                                    <Link to="/usuarios" onClick={cerrarMenu}>
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

                        <Link to="/" onClick={cerrarMenu}>
                            🔑 Login
                        </Link>

                        <Link to="/register" onClick={cerrarMenu}>
                            📝 Registro
                        </Link>

                    </nav>

                }

            </aside>
        </>
    );

}

export default Navbar;