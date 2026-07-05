import { useEffect, useState, useContext } from "react";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";
import Spinner from "../components/Spinner";
import Skeleton from "../components/Skeleton";

function Usuarios() {

    const { usuario } = useContext(AuthContext);

    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [savingId, setSavingId] = useState(null);

    useEffect(() => {
        obtenerUsuarios();
    }, []);

    const obtenerUsuarios = async () => {
        setLoading(true);
        setError("");

        try {
            const res = await api.get("/usuarios");
            setUsuarios(res.data);
        } catch (error) {
            console.log(error);
            setError("No se pudieron cargar los usuarios. Intenta nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    const cambiarRol = async (id, rol) => {
        setSavingId(id);

        try {
            await api.put(`/usuarios/${id}/rol`, { rol });
            await obtenerUsuarios();
        } catch (error) {
            console.log(error);
            alert("No se pudo actualizar el rol");
        } finally {
            setSavingId(null);
        }
    };

    return (
        <div className="container">
            <h1>Gestión de Usuarios</h1>

            {loading ? (
                <Skeleton type="table" count={5} />
            ) : error ? (
                <div className="state-card error">
                    <p>{error}</p>
                    <button className="btn btn-primary" onClick={obtenerUsuarios}>Reintentar</button>
                </div>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map(item => (
                            <tr key={item.id}>
                                <td>{item.nombre}</td>
                                <td>{item.email}</td>
                                <td>
                                    <select
                                        defaultValue={item.rol}
                                        disabled={item.id === usuario.id}
                                        onChange={(e) => {
                                            item.rol = e.target.value;
                                        }}
                                    >
                                        <option value="cliente">Cliente</option>
                                        <option value="admin">Administrador</option>
                                    </select>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-primary"
                                        disabled={item.id === usuario.id || savingId === item.id}
                                        onClick={() => cambiarRol(item.id, item.rol)}
                                    >
                                        {savingId === item.id ? <Spinner size="sm" label="" inline /> : "Guardar"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Usuarios;