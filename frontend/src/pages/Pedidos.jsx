import { useEffect, useState } from "react";
import api from "../api/api";

function Pedidos() {

    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {

        obtenerPedidos();

    }, []);

    const obtenerPedidos = async () => {

        try {

            const respuesta = await api.get("/pedidos");

            setPedidos(respuesta.data);

        } catch (error) {

            console.log(error);

        }

    };
    const cambiarEstado = async (id, estado) => {

    try {

        await api.put(`/pedidos/${id}`, {

            estado

        });

        obtenerPedidos();

    } catch (error) {

        console.log(error);

    }

};

    return (
<>


            <h1 className="text-center ">Mis Pedidos</h1> 
        <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>


            <table className="table table-striped table-bordered table-hover">

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

                    {

                        pedidos.map(pedido => (

                            <tr key={pedido.id}>

                                <td>{pedido.id}</td>

                                <td>{pedido.nombre}</td>

                                <td>${pedido.total}</td>

                                <td>

    <select
        value={pedido.estado}
        onChange={(e) =>
            cambiarEstado(pedido.id, e.target.value)
        }
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

                        ))

                    }

                </tbody>

            </table>

        </div>
</>

    );

}

export default Pedidos;