const express = require("express");
const teacherController = require("../../controllers/Docentes/teacherController.js");
const router = express.Router();

// Ruta para agregar un nuevo docente
router.post("/add", teacherController.addTeacher);

// Ruta para obtener todos los docentes
router.get("/list", teacherController.getTeachers);

router.put('/update/:id', teacherController.updateTeacherStatus);



module.exports = router;
