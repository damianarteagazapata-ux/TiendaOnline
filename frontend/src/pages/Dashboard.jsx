import { useEffect, useState } from "react";
import api from "../api/api";

function Dashboard() {

    const [data, setData] = useState({});

    useEffect(() => {
        cargar();
    }, []);

    const cargar = async () => {

        const res = await api.get("/pedidos/estadisticas");

        setData(res.data);

    };

    return (

        <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>


            <div className="login-card"> 
            <h1 className="text-center align-items-center">Dashboard Admin</h1>

                <p>Total pedidos: {data.totalPedidos}</p>
                <p>Total productos: {data.totalProductos}</p>
                <p>Pedidos pendientes: {data.pendientes}</p>
                <p>Total ventas: ${data.ventas}</p>

            </div>

        </div>

    );

}

export default Dashboard;