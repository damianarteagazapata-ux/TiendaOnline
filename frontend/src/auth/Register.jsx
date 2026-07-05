import { useState } from "react";
import api from "../api/api";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        nombre: "",
        email: "",
        password: "",
        telefono: "",
        direccion: ""
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const respuesta = await api.post("/auth/register", form);
            alert(respuesta.data.mensaje);

            setForm({
                nombre: "",
                email: "",
                password: "",
                telefono: "",
                direccion: ""
            });

            navigate("/");
        } catch (error) {
            alert("Error al registrar");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-card">
                <h1>Registro</h1>

                <input type="text" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} />
                <br /><br />
                <input type="email" name="email" placeholder="Correo" value={form.email} onChange={handleChange} />
                <br /><br />
                <input type="password" name="password" placeholder="Contraseña" value={form.password} onChange={handleChange} />
                <br /><br />
                <input type="text" name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} />
                <br /><br />
                <input type="text" name="direccion" placeholder="Dirección" value={form.direccion} onChange={handleChange} />
                <br /><br />

                <button type="submit" disabled={loading}>
                    {loading ? <Spinner size="sm" label="" inline /> : "Registrarse"}
                </button>
                <Link to="/" className="text-center mt-3">¿Ya tienes una cuenta? Inicia sesión</Link>
            </form>
        </div>
    );
}

export default Register;