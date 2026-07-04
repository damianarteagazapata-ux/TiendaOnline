import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/globals.css";

import App from "./App";
import AuthProvider from "./context/AuthContext";
import CartProvider from "./context/CartContext";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

ReactDOM.createRoot(document.getElementById("root")).render(

    <BrowserRouter>

        <AuthProvider>

            <CartProvider>

                <App />

            </CartProvider>

        </AuthProvider>

    </BrowserRouter>
);