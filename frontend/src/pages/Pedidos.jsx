import { useEffect, useState } from "react";
import api from "../api/api";
import Skeleton from "../components/Skeleton";
import Spinner from "../components/Spinner";

function Pedidos() {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [updatingId, setUpdatingId] = useState(null);
    const [detallePedido, setDetallePedido] = useState(null);
    const [detalleLoading, setDetalleLoading] = useState(false);
    const [detalleError, setDetalleError] = useState("");
    const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);

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

    const verProductos = async (pedido) => {
        setPedidoSeleccionado(pedido.id);
        setDetalleLoading(true);
        setDetalleError("");
        setDetallePedido(null);

        try {
            const respuesta = await api.get(`/pedidos/${pedido.id}/productos`);
            setDetallePedido(respuesta.data);
        } catch (error) {
            console.log(error);
            setDetalleError("No se pudieron cargar los productos de este pedido.");
        } finally {
            setDetalleLoading(false);
        }
    };

    const cerrarDetalle = () => {
        setPedidoSeleccionado(null);
        setDetallePedido(null);
        setDetalleError("");
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
                                    <th>Detalle</th>
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
                                        <td>
                                            <button className="btn btn-outline" onClick={() => verProductos(pedido)}>
                                                Ver productos
                                            </button>
                                        </td>
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

                                <button className="btn btn-outline w-100 mt-2" onClick={() => verProductos(pedido)}>
                                    Ver productos
                                </button>
                            </article>
                        ))}
                    </div>
                </>
            )}

            {pedidoSeleccionado !== null && (
                <div className="detalle-modal" role="dialog" aria-modal="true">
                    <div className="detalle-modal__content" onClick={(e) => e.stopPropagation()}>
                        <div className="detalle-modal__header">
                            <div>
                                <p className="pedido-card__label">Pedido #{pedidoSeleccionado}</p>
                                <h2>Productos del pedido</h2>
                            </div>
                            <button className="btn btn-outline" onClick={cerrarDetalle}>
                                Cerrar
                            </button>
                        </div>

                        {detalleLoading ? (
                            <Spinner label="Cargando productos..." />
                        ) : detalleError ? (
                            <div className="state-card error">
                                <p>{detalleError}</p>
                            </div>
                        ) : detallePedido?.productos?.length === 0 ? (
                            <div className="pedido-empty">No hay productos asociados a este pedido.</div>
                        ) : (
                            <>
                                <div className="detalle-lista">
                                    {detallePedido?.productos?.map((producto) => (
                                        <div className="detalle-item" key={producto.id}>
                                            {producto.imagen ? (
                                                <img className="detalle-item__img" src={producto.imagen} alt={producto.nombre} />
                                            ) : (
                                                <div className="detalle-item__placeholder">Sin imagen</div>
                                            )}

                                            <div className="detalle-item__body">
                                                <h3>{producto.nombre}</h3>
                                                <div className="detalle-item__meta">
                                                    <span>Precio unitario: ${producto.precioUnitario}</span>
                                                    <span>Cantidad: {producto.cantidad}</span>
                                                    <span>Subtotal: ${producto.subtotal}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="detalle-resumen">
                                    <div className="detalle-resumen__row">
                                        <span>Total de productos</span>
                                        <strong>{detallePedido?.resumen?.totalProductos ?? 0}</strong>
                                    </div>
                                    <div className="detalle-resumen__row">
                                        <span>Total de unidades</span>
                                        <strong>{detallePedido?.resumen?.totalUnidades ?? 0}</strong>
                                    </div>
                                    <div className="detalle-resumen__row">
                                        <span>Total del pedido</span>
                                        <strong>${detallePedido?.resumen?.totalPedido ?? 0}</strong>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Pedidos;