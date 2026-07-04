import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "../pages/Cart";
import Home from "../pages/Home";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Pedidos from "../pages/Pedidos";
import AdminProductos from "../pages/AdminProductos";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import Dashboard from "../pages/Dashboard";
function RouterApp() {
    return (
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />

<Route
    path="/home"
    element={
        <PrivateRoute>
            <Home />
        </PrivateRoute>
    }
/>

<Route
    path="/carrito"
    element={
        <PrivateRoute>
            <Cart />
        </PrivateRoute>
    }
/>

<Route
    path="/pedidos"
    element={
        <PrivateRoute>
            <Pedidos />
        </PrivateRoute>
    }
/>
<Route
    path="/admin"
    element={
        <AdminRoute>
            <Dashboard />
        </AdminRoute>
    }
/>

<Route
    path="/admin/productos"
    element={
        <AdminRoute>
            <AdminProductos />
        </AdminRoute>
    }
/>
            </Routes>
    );
}

export default RouterApp;