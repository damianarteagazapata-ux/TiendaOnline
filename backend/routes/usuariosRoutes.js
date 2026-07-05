const express = require("express");

const router = express.Router();

const {

    obtenerUsuarios,

    cambiarRol

} = require("../controllers/usuariosController");


const verificarToken = require("../middleware/auth");
const esAdmin = require("../middleware/admin");

router.get(

    "/",

    verificarToken,

    esAdmin,

    obtenerUsuarios

);

router.put(

    "/:id/rol",

    verificarToken,

    esAdmin,

    cambiarRol

);

module.exports = router;