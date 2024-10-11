const express = require("express");
const jwt = require("jsonwebtoken"); // IMPORTAR JWT aquí
const authController = require("../controllers/authController.js");
const router = express.Router();

// Ruta para login
router.post("/login", authController.login);

// Ruta para refresh token
router.post("/refresh-token", (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken)
    return res
      .status(401)
      .json({ message: "No se proporcionó el refresh token" });

  // Verificar el refresh token
  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Refresh token inválido" });

    // Generar un nuevo access token
    const newAccessToken = jwt.sign(
      { id: decoded.id },
      process.env.JWT_SECRET,
      { expiresIn: "15s" }
    );
    const newExpirationTime = Math.floor(Date.now() / 1000) + 15; //(15 * 60); este es para 15m // Expiración en 15 minutos
    res.json({
      accessToken: newAccessToken,
      expirationTime: newExpirationTime,
    });
  });
});

// Ruta para obtener los datos del usuario autenticado
router.get("/userdata", (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Token de acceso no proporcionado" });
  }

  // Verificar el token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido" });
    }

    // Enviar de vuelta los datos del usuario decodificado
    res.json({
      id: user.id,
    });
  });
});

// Ruta para registro de usuario
router.post("/register", authController.register); // Añadimos la ruta para el registro

module.exports = router;
