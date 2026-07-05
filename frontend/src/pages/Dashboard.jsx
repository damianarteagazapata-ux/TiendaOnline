import { useEffect, useState } from "react";
import api from "../api/api";
import Spinner from "../components/Spinner";

function Dashboard() {

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        cargar();
    }, []);

    const cargar = async () => {
        setLoading(true);
        setError("");

        try {
            const res = await api.get("/pedidos/estadisticas");
            setData(res.data);
        } catch (error) {
            console.log(error);
            setError("No se pudieron cargar las estadísticas.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <div className="login-card">
                <h1 className="text-center align-items-center">Dashboard Admin</h1>

                {loading ? (
                    <div className="flex-center py-3"><Spinner label="Cargando estadísticas" /></div>
                ) : error ? (
                    <div className="state-card error">
                        <p>{error}</p>
                        <button className="btn btn-primary" onClick={cargar}>Reintentar</button>
                    </div>
                ) : (
                    <>
                        <p>Total pedidos: {data.totalPedidos}</p>
                        <p>Total productos: {data.totalProductos}</p>
                        <p>Pedidos pendientes: {data.pendientes}</p>
                        <p>Total ventas: ${data.ventas}</p>
                    </>
                )}
            </div>
        </div>
    );
}

export default Dashboard;