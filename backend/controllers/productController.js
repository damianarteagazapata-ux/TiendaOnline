const db = require("../config/db");





// Devuelve el catálogo completo de productos.
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

// Guarda un producto nuevo con los datos enviados por el administrador.
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

// Actualiza los datos de un producto y maneja errores por dependencias en pedidos.
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

                if (error.code === "ER_ROW_IS_REFERENCED_2" || error.errno === 1451) {
                    return res.status(400).json({
                        mensaje: "Este producto fue asociado a un pedido"
                    });
                }

                return res.status(500).json(error);

            }

            res.json({

                mensaje: "Producto actualizado"

            });

        }

    );

};

// Elimina un producto cuando no está asociado a pedidos.
exports.eliminarProducto = (req, res) => {

    const { id } = req.params;

    db.query(

        "DELETE FROM productos WHERE id = ?",

        [id],

        (error) => {

            if (error) {
                if (error.code === "ER_ROW_IS_REFERENCED_2" || error.errno === 1451) {
                    return res.status(400).json({
                        mensaje: "Este producto fue asociado a un pedido"
                    });
                }

                return res.status(500).json(error);

            }

            res.json({

                mensaje: "Producto eliminado"

            });

        }

    );

};
