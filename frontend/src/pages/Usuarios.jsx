import { useEffect, useState, useContext } from "react";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";

function Usuarios() {

    const { usuario } = useContext(AuthContext);

    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {

        obtenerUsuarios();

    }, []);

    const obtenerUsuarios = async () => {

        try {

            const res = await api.get("/usuarios");

            setUsuarios(res.data);

        } catch (error) {

            console.log(error);

        }

    };

    const cambiarRol = async (id, rol) => {

        try {

            await api.put(`/usuarios/${id}/rol`, { rol });

            obtenerUsuarios();

        } catch (error) {

            console.log(error);

            alert("No se pudo actualizar el rol");

        }

    };

    return (

        <div className="container">

            <h1>Gestión de Usuarios</h1>

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

                    {

                        usuarios.map(item => (

                            <tr key={item.id}>

                                <td>{item.nombre}</td>

                                <td>{item.email}</td>

                                <td>

                                    <select

                                        defaultValue={item.rol}

                                        disabled={item.id === usuario.id}

                                        onChange={(e)=>{

                                            item.rol = e.target.value;

                                        }}

                                    >

                                        <option value="cliente">

                                            Cliente

                                        </option>

                                        <option value="admin">

                                            Administrador

                                        </option>

                                    </select>

                                </td>

                                <td>

                                    <button

                                        className="btn btn-primary"

                                        disabled={item.id === usuario.id}

                                        onClick={()=>cambiarRol(item.id,item.rol)}

                                    >

                                        Guardar

                                    </button>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default Usuarios;