const express = require("express");

const router = express.Router();

const verificarToken = require("../middleware/auth");
const verificarAdmin = require("../middleware/admin");

const {
    obtenerProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto
} = require("../controllers/productController");

router.get("/", obtenerProductos);

router.post("/", crearProducto);

router.put(
    "/:id",
    verificarToken,
    verificarAdmin,
    actualizarProducto
);

router.delete(
    "/:id",
    verificarToken,
    verificarAdmin,
    eliminarProducto
);

module.exports = router;