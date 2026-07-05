const Pool = require("../config/db");

// Crea un pedido nuevo y registra cada producto en su detalle.
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


// Devuelve los pedidos del usuario actual o todos si es administrador.
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

// Cambia el estado de un pedido ya creado.
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

// Devuelve los productos asociados a un pedido cuando el usuario tiene permiso.
exports.obtenerProductosPedido = (req, res) => {

    const { id } = req.params;
    const usuario = req.usuario;

    const sqlPedido = `
        SELECT
            p.id,
            p.usuario_id,
            p.total,
            p.estado,
            p.fecha,
            u.nombre AS cliente
        FROM pedidos p
        INNER JOIN usuarios u ON p.usuario_id = u.id
        WHERE p.id = ?
    `;

    Pool.query(sqlPedido, [id], (errorPedido, resultadosPedido) => {

        if (errorPedido) {
            return res.status(500).json(errorPedido);
        }

        if (resultadosPedido.length === 0) {
            return res.status(404).json({ mensaje: "Pedido no encontrado" });
        }

        const pedido = resultadosPedido[0];

        if (usuario.rol !== "admin" && pedido.usuario_id !== usuario.id) {
            return res.status(403).json({ mensaje: "No tienes permisos para ver este pedido" });
        }

        const sqlDetalle = `
            SELECT
                pr.id AS producto_id,
                pr.nombre,
                pr.imagen,
                pd.cantidad,
                pd.precio AS precio_unitario,
                ROUND(pd.precio * pd.cantidad, 2) AS subtotal
            FROM pedido_detalle pd
            INNER JOIN productos pr ON pd.producto_id = pr.id
            WHERE pd.pedido_id = ?
            ORDER BY pr.nombre ASC
        `;

        Pool.query(sqlDetalle, [id], (errorDetalle, resultadosDetalle) => {

            if (errorDetalle) {
                return res.status(500).json(errorDetalle);
            }

            const productos = resultadosDetalle.map((producto) => ({
                id: producto.producto_id,
                nombre: producto.nombre,
                imagen: producto.imagen,
                precioUnitario: Number(producto.precio_unitario),
                cantidad: producto.cantidad,
                subtotal: Number(producto.subtotal)
            }));

            const resumen = {
                totalProductos: productos.length,
                totalUnidades: productos.reduce((total, producto) => total + producto.cantidad, 0),
                totalPedido: Number(pedido.total)
            };

            res.json({
                pedido: {
                    id: pedido.id,
                    cliente: pedido.cliente,
                    estado: pedido.estado,
                    fecha: pedido.fecha,
                    total: Number(pedido.total)
                },
                productos,
                resumen
            });

        });

    });

};

// Reúne métricas básicas para el panel de administración.
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