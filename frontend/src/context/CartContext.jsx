import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

// Mantiene el carrito por usuario y lo sincroniza con el almacenamiento local.
function CartProvider({ children }) {
const { usuario } = useContext(AuthContext);

// Usa una clave distinta por usuario para conservar el carrito entre sesiones.
const carritoKey = usuario
    ? `carrito_${usuario.id}`
    : "carrito";
    
const [carrito, setCarrito] = useState([]);

// Carga el carrito guardado cuando cambia el usuario activo.
useEffect(() => {

    const carritoGuardado =
        JSON.parse(localStorage.getItem(carritoKey)) || [];

    setCarrito(carritoGuardado);

}, [carritoKey]);

// Guarda el carrito en el almacenamiento local para restaurarlo después.
useEffect(() => {

    localStorage.setItem(
        carritoKey,
        JSON.stringify(carrito)
    );

}, [carrito, carritoKey]);

    // Agrega un producto nuevo o incrementa la cantidad si ya existe.
    const agregarCarrito = (producto) => {

        const existe = carrito.find(
            item => item.id === producto.id
        );

        if (existe) {

            const nuevoCarrito = carrito.map(item =>

                item.id === producto.id
                    ? { ...item, cantidad: item.cantidad + 1 }
                    : item

            );

            setCarrito(nuevoCarrito);

        } else {

            setCarrito([
                ...carrito,
                {
                    ...producto,
                    cantidad: 1
                }
            ]);

        }

    };
    const aumentarCantidad = (id) => {

    const nuevoCarrito = carrito.map(item =>
        item.id === id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
    );

    setCarrito(nuevoCarrito);

};

const disminuirCantidad = (id) => {

    const nuevoCarrito = carrito
        .map(item =>
            item.id === id
                ? { ...item, cantidad: item.cantidad - 1 }
                : item
        )
        .filter(item => item.cantidad > 0);

    setCarrito(nuevoCarrito);

};

const eliminarProducto = (id) => {

    const nuevoCarrito = carrito.filter(
        item => item.id !== id
    );

    setCarrito(nuevoCarrito);

};

const vaciarCarrito = () => {

    setCarrito([]);

};

    return (

        <CartContext.Provider
value={{
    carrito,
    agregarCarrito,
    aumentarCantidad,
    disminuirCantidad,
    eliminarProducto,
    vaciarCarrito
}}
        >

            {children}

        </CartContext.Provider>

    );

}

export default CartProvider;