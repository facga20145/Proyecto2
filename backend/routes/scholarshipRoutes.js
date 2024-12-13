const express = require("express");
const router = express.Router();
const scholarshipController = require("../controllers/scholarshipController");
const fileUpload = require("express-fileupload");

// Middleware para manejar archivos
router.use(fileUpload());

// Ruta para obtener solicitudes pendientes
router.get("/pending", scholarshipController.getPendingScholarships);

// Ruta para obtener la lista de becados
router.get("/list", scholarshipController.getBecados); // Asegúrate de que exista este controlador en scholarshipController

// Ruta para aprobar una beca
router.post("/approve", scholarshipController.approveScholarship);

// Ruta para rechazar una beca
router.post("/reject", scholarshipController.rejectScholarship);

// Ruta para agregar una nueva solicitud de beca
router.post("/add", scholarshipController.addScholarshipRequest);

// Ruta para desactivar una beca
router.put("/deactivate/:idBeca", scholarshipController.deactivateBeca);

// Ruta para agregar una nueva solicitud de beca
router.post("/add", scholarshipController.addScholarshipRequest);

module.exports = router;
