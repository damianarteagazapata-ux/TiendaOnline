import { createContext, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {

    const [usuario, setUsuario] = useState(
        JSON.parse(localStorage.getItem("usuario")) || null
    );

    const login = (datos) => {
        localStorage.setItem("usuario", JSON.stringify(datos));
        setUsuario(datos);
    };

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