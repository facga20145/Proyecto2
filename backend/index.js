const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connection = require("../backend/config/db.js"); // Importar la conexión a la BD
const authRoutes = require("../backend/routes/authRoutes.js");
const teacherRoutes = require("./routes/Docentes/teacherRoutes.js");
const courseRoutes = require("./routes/courseRoutes.js");
const adminRoutes = require("./routes/Admin/adminRoutes.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("¡Servidor funcionando correctamente!");
});

// Rutas de autenticación
app.use("/api/auth", authRoutes);

// Rutas de docentes
app.use("/api/teachers", teacherRoutes);

// Rutas de cursos
app.use("/api", courseRoutes);

app.use("/api/admins", adminRoutes);


// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
