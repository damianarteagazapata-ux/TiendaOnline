import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function AdminRoute({ children }) {

    const { usuario } = useContext(AuthContext);

    if (!usuario) {

        return <Navigate to="/" replace />;

    }

    if (usuario.rol !== "admin") {

        return <Navigate to="/home" replace />;

    }

    return children;

}

export default AdminRoute;