const verificarAdmin = require("../middleware/admin");

const express = require("express");

const router = express.Router();

const verificarToken = require("../middleware/auth");


const {
    crearPedido,
    obtenerPedidos,
    actualizarEstado,
    estadisticas,
    obtenerProductosPedido
} = require("../controllers/pedidoController");

router.post("/", verificarToken, crearPedido);

router.get("/estadisticas", verificarToken, verificarAdmin, estadisticas);

router.get("/", verificarToken, obtenerPedidos);

router.get("/:id/productos", verificarToken, obtenerProductosPedido);

router.put(
    "/:id",
    verificarToken,
    verificarAdmin,
    actualizarEstado
);
module.exports = router;