const db = require("../config/db");





// Obtener todos los productos
exports.obtenerProductos = (req, res) => {

    db.query(
        "SELECT * FROM productos",
        (err, resultados) => {

            if (err)
                return res.status(500).json(err);

            res.json(resultados);

        }
    );

};

exports.crearProducto = (req, res) => {

    const {
        nombre,
        descripcion,
        precio,
        stock,
        imagen
    } = req.body;

    db.query(

        `INSERT INTO productos
        (nombre, descripcion, precio, stock, imagen)
        VALUES (?, ?, ?, ?, ?)`,

        [
            nombre,
            descripcion,
            precio,
            stock,
            imagen
        ],

        (err, resultado) => {

            if (err) {

                return res.status(500).json(err);

            }

            res.json({

                mensaje: "Producto creado",
                id: resultado.insertId

            });

        }

    );

};

exports.actualizarProducto = (req, res) => {

    const { id } = req.params;

    const {
        nombre,
        descripcion,
        precio,
        stock,
        imagen
    } = req.body;

    db.query(

        `UPDATE productos
        SET nombre = ?,
            descripcion = ?,
            precio = ?,
            stock = ?,
            imagen = ?
        WHERE id = ?`,

        [
            nombre,
            descripcion,
            precio,
            stock,
            imagen,
            id
        ],

        (error) => {

            if (error) {

                return res.status(500).json(error);

            }

            res.json({

                mensaje: "Producto actualizado"

            });

        }

    );

};

exports.eliminarProducto = (req, res) => {

    const { id } = req.params;

    db.query(

        "DELETE FROM productos WHERE id = ?",

        [id],

        (error) => {

            if (error) {

                return res.status(500).json(error);

            }

            res.json({

                mensaje: "Producto eliminado"

            });

        }

    );

};