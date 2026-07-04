const Pool = require("../config/db");

exports.crearPedido = async (req, res) => {

    const { total, productos } = req.body;

    const usuarioId = req.usuario.id;

    Pool.query(

        "INSERT INTO pedidos (usuario_id, total) VALUES (?, ?)",

        [usuarioId, total],

        (error, resultado) => {

            if (error) {
                return res.status(500).json(error);
            }

            const pedidoId = resultado.insertId;

            productos.forEach((producto) => {

                Pool.query(

                    `INSERT INTO pedido_detalle
                    (pedido_id, producto_id, cantidad, precio)
                    VALUES (?, ?, ?, ?)`,

                    [
                        pedidoId,
                        producto.id,
                        producto.cantidad,
                        producto.precio
                    ],

                    (error) => {
                        if (error) {
                            console.log(error);
                        }
                    }

                );

            });

            res.json({
                mensaje: "Pedido completo creado",
                pedidoId
            });

        }

    );

};


exports.obtenerPedidos = (req, res) => {

    let sql = "";

    let parametros = [];

    if (req.usuario.rol === "admin") {

        sql = `
            SELECT
                p.id,
                p.total,
                p.estado,
                p.fecha,
                u.nombre
            FROM pedidos p
            INNER JOIN usuarios u
                ON p.usuario_id = u.id
            ORDER BY p.fecha DESC
        `;

    } else {

        sql = `
            SELECT
                p.id,
                p.total,
                p.estado,
                p.fecha,
                u.nombre
            FROM pedidos p
            INNER JOIN usuarios u
                ON p.usuario_id = u.id
            WHERE p.usuario_id = ?
            ORDER BY p.fecha DESC
        `;

        parametros = [req.usuario.id];

    }

    Pool.query(sql, parametros, (error, resultados) => {

        if (error) {

            return res.status(500).json(error);

        }

        res.json(resultados);

    });

};

exports.actualizarEstado = (req, res) => {

    const { id } = req.params;

    const { estado } = req.body;

    Pool.query(

        "UPDATE pedidos SET estado = ? WHERE id = ?",

        [estado, id],

        (error) => {

            if (error) {

                return res.status(500).json(error);

            }

            res.json({

                mensaje: "Estado actualizado"

            });

        }

    );

};
exports.estadisticas = (req, res) => {

    const sqlPedidos = "SELECT COUNT(*) AS totalPedidos FROM pedidos";
    const sqlProductos = "SELECT COUNT(*) AS totalProductos FROM productos";
    const sqlPendientes = "SELECT COUNT(*) AS pendientes FROM pedidos WHERE estado = 'Pendiente'";
    const sqlVentas = "SELECT COALESCE(SUM(total),0) AS ventas FROM pedidos";

    let respuesta = {};

    Pool.query(sqlPedidos, (err1, r1) => {

        if (err1) return res.status(500).json(err1);

        respuesta.totalPedidos = r1[0].totalPedidos;

        Pool.query(sqlProductos, (err2, r2) => {

            if (err2) return res.status(500).json(err2);

            respuesta.totalProductos = r2[0].totalProductos;

            Pool.query(sqlPendientes, (err3, r3) => {

                if (err3) return res.status(500).json(err3);

                respuesta.pendientes = r3[0].pendientes;

                Pool.query(sqlVentas, (err4, r4) => {

                    if (err4) return res.status(500).json(err4);

                    respuesta.ventas = r4[0].ventas;

                    res.json(respuesta);

                });

            });

        });

    });

};