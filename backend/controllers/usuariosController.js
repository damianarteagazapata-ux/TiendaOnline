const Pool = require("../config/db");

exports.obtenerUsuarios = (req, res) => {

    Pool.query(

        "SELECT id,nombre,email,rol FROM usuarios",

        (err, resultados) => {

            if (err)
                return res.status(500).json(err);

            res.json(resultados);

        }

    );

};

exports.cambiarRol = (req, res) => {

    const { id } = req.params;
    const { rol } = req.body;

    Pool.query(

        "UPDATE usuarios SET rol=? WHERE id=?",

        [rol, id],

        (err) => {

            if (err)
                return res.status(500).json(err);

            res.json({

                mensaje: "Rol actualizado"

            });

        }

    );

};