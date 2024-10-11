const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connection = require("../backend/config/db.js"); // Importar la conexión a la BD
const authRoutes = require("../backend/routes/authRoutes.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("¡Servidor funcionando correctamente!");
});

// Importar y usar las rutas de autenticación
app.use("/api/auth", authRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
