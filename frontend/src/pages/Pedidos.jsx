import { useEffect, useState } from "react";
import api from "../api/api";
import Skeleton from "../components/Skeleton";
import Spinner from "../components/Spinner";

function Pedidos() {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [updatingId, setUpdatingId] = useState(null);

    useEffect(() => {
        obtenerPedidos();
    }, []);

    const obtenerPedidos = async () => {
        setLoading(true);
        setError("");

        try {
            const respuesta = await api.get("/pedidos");
            setPedidos(respuesta.data);
        } catch (error) {
            console.log(error);
            setError("No se pudieron cargar los pedidos. Intenta nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    const cambiarEstado = async (id, estado) => {
        setUpdatingId(id);

        try {
            await api.put(`/pedidos/${id}`, { estado });
            await obtenerPedidos();
        } catch (error) {
            console.log(error);
            alert("No se pudo actualizar el estado del pedido");
        } finally {
            setUpdatingId(null);
        }
    };

    return (
        <div className="container py-4">
            <div className="text-center mb-4">
                <h1 className="mb-2">Mis Pedidos</h1>
                <p className="text-muted mb-0">
                    Revisa y actualiza el estado de tus pedidos desde cualquier dispositivo.
                </p>
            </div>

            {loading ? (
                <>
                    <div className="d-none d-lg-block"><Skeleton type="table" count={6} /></div>
                    <div className="d-lg-none"><Skeleton count={3} /></div>
                </>
            ) : error ? (
                <div className="state-card error">
                    <p>{error}</p>
                    <button className="btn btn-primary" onClick={obtenerPedidos}>Reintentar</button>
                </div>
            ) : pedidos.length === 0 ? (
                <div className="pedido-empty">No hay pedidos registrados todavía.</div>
            ) : (
                <>
                    <div className="table-responsive d-none d-lg-block">
                        <table className="table table-striped table-bordered table-hover align-middle mb-0">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Cliente</th>
                                    <th>Total</th>
                                    <th>Estado</th>
                                    <th>Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pedidos.map((pedido) => (
                                    <tr key={pedido.id}>
                                        <td>{pedido.id}</td>
                                        <td>{pedido.nombre}</td>
                                        <td>${pedido.total}</td>
                                        <td>
                                            <select
                                                className="form-select form-select-sm pedido-select"
                                                value={pedido.estado}
                                                onChange={(e) => cambiarEstado(pedido.id, e.target.value)}
                                                disabled={updatingId === pedido.id}
                                            >
                                                <option>Pendiente</option>
                                                <option>Aprobado</option>
                                                <option>Rechazado</option>
                                                <option>Enviado</option>
                                                <option>Entregado</option>
                                            </select>
                                        </td>
                                        <td>{pedido.fecha}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="d-lg-none pedidos-mobile-list">
                        {pedidos.map((pedido) => (
                            <article className="pedido-card" key={pedido.id}>
                                <div className="pedido-card__header">
                                    <div>
                                        <p className="pedido-card__label">Pedido #{pedido.id}</p>
                                        <h2>{pedido.nombre}</h2>
                                    </div>
                                    <span className="badge">{pedido.estado}</span>
                                </div>

                                <div className="pedido-card__meta">
                                    <div>
                                        <strong>Total</strong>
                                        <span>${pedido.total}</span>
                                    </div>
                                    <div>
                                        <strong>Fecha</strong>
                                        <span>{pedido.fecha}</span>
                                    </div>
                                </div>

                                <label className="pedido-card__field">
                                    <span>Estado</span>
                                    <select
                                        className="form-select pedido-select"
                                        value={pedido.estado}
                                        onChange={(e) => cambiarEstado(pedido.id, e.target.value)}
                                        disabled={updatingId === pedido.id}
                                    >
                                        <option>Pendiente</option>
                                        <option>Aprobado</option>
                                        <option>Rechazado</option>
                                        <option>Enviado</option>
                                        <option>Entregado</option>
                                    </select>
                                </label>
                            </article>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default Pedidos;