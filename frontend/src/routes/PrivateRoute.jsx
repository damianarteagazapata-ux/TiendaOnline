import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function PrivateRoute({ children }) {

    const { usuario } = useContext(AuthContext);

    if (!usuario) {

        return <Navigate to="/" replace />;

    }

    return children;

}

export default PrivateRoute;