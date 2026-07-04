const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Registrar usuario
exports.register = async (req, res) => {

    const { nombre, email, password, telefono, direccion } = req.body;

    try {

        const passwordHash = await bcrypt.hash(password, 10);

        db.query(
            `INSERT INTO usuarios
            (nombre,email,password,telefono,direccion,rol)
            VALUES (?,?,?,?,?,'cliente')`,
            [nombre, email, passwordHash, telefono, direccion],
            (err, result) => {

                if (err) {
                    return res.status(500).json(err);
                }

                res.json({
                    mensaje: "Usuario registrado correctamente"
                });

            }
        );

    } catch (error) {
        res.status(500).json(error);
    }

};


// Login
exports.login = (req, res) => {

    const { email, password } = req.body;

    db.query(
        "SELECT * FROM usuarios WHERE email=?",
        [email],
        async (err, resultados) => {

            if (err)
                return res.status(500).json(err);

            if (resultados.length === 0)
                return res.status(401).json({
                    mensaje: "Usuario no encontrado"
                });

            const usuario = resultados[0];

            const coincide = await bcrypt.compare(password, usuario.password);

            if (!coincide)
                return res.status(401).json({
                    mensaje: "Contraseña incorrecta"
                });

            const token = jwt.sign(
                {
                    id: usuario.id,
                    rol: usuario.rol
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "2h"
                }
            );

res.json({

    mensaje: "Login correcto",

    id: usuario.id,

    token,

    rol: usuario.rol,

    nombre: usuario.nombre

});

        });

};