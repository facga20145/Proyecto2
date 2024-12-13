const express = require("express");
const userController = require("../controllers/userController.js");
const router = express.Router();

// Obtener usuarios con detalles
router.get("/list", userController.getUsers);

// Actualizar el estado de un usuario
router.put("/update/:id", userController.updateUserStatus);

module.exports = router;
