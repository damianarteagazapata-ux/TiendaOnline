import { createContext, useState } from "react";

export const AuthContext = createContext();

// Proporciona el estado de autenticación y guarda la sesión en el navegador.
function AuthProvider({ children }) {

    const [usuario, setUsuario] = useState(
        JSON.parse(localStorage.getItem("usuario")) || null
    );

    // Guarda los datos del usuario y actualiza el estado global.
    const login = (datos) => {
        localStorage.setItem("usuario", JSON.stringify(datos));
        setUsuario(datos);
    };

// Limpia la sesión activa y deja la app sin usuario autenticado.
const logout = () => {

    localStorage.removeItem("usuario");
    localStorage.removeItem("token");

    setUsuario(null);

};

    return (
        <AuthContext.Provider value={{ usuario, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;