import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";
import Spinner from "../components/Spinner";

function Login() {

    const navigate = useNavigate();

    const { login }  = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const respuesta = await api.post("/auth/login", {
                email,
                password
            });
            login(respuesta.data);
            alert("Bienvenido " + respuesta.data.nombre);
            navigate("/home");
        } catch (error) {
            alert("Correo o contraseña incorrectos");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-card">
                <h2>Tienda Online</h2>
                <p>Inicia sesión para continuar</p>

                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit" disabled={loading}>
                    {loading ? <Spinner size="sm" label="" inline /> : "Ingresar"}
                </button>
                <Link to="/register">¿No tienes cuenta? Regístrate</Link>
            </form>
        </div>
    );
}

export default Login;