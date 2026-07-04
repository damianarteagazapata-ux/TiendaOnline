require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");

const productRoutes = require("./routes/productRoutes");
const verificarToken = require("./middleware/auth");
const pedidoRoutes = require("./routes/pedidoRoutes");

app.get("/perfil", verificarToken, (req, res) => {

    res.json({

        mensaje: "Ruta protegida",

        usuario: req.usuario

    });

});


app.use("/auth", authRoutes);
app.use("/productos", productRoutes);
app.use("/pedidos", pedidoRoutes);

app.get("/", (req, res) => {
    res.send("API funcionando");
});

app.listen(process.env.PORT, () => {
    console.log("Servidorsaso iniciado en el puerto 👌", process.env.PORT);
});

