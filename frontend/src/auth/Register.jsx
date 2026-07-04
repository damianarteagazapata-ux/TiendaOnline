import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        nombre: "",
        email: "",
        password: "",
        telefono: "",
        direccion: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

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

        }

    };

    return (

        <div className="login-container">


            <form  onSubmit={handleSubmit} className="login-card">
            <h1>Registro</h1>

                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    value={form.nombre}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="email"
                    name="email"
                    placeholder="Correo"
                    value={form.email}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={form.password}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="text"
                    name="telefono"
                    placeholder="Teléfono"
                    value={form.telefono}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="text"
                    name="direccion"
                    placeholder="Dirección"
                    value={form.direccion}
                    onChange={handleChange}
                />

                <br /><br />

                <button type="submit">
                    Registrarse
                </button>

            </form>

        </div>

    );

}

export default Register;