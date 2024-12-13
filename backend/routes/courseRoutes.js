// routes/courseRoutes.js
const express = require('express');
const router = express.Router();
const { getCategorias, createCurso, getDocentes, getActiveCourses, deleteCurso } = require('../controllers/courseController');
const multer = require('multer');
const path = require('path');

// Configurar multer para almacenar las imágenes en la ruta deseada
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Ajusta esta ruta según tu entorno.
      cb(null, 'C:/xampp/htdocs/Pagina_Cursos_online/uploads/cursos');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(file.originalname).toLowerCase();
      cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
      const allowedExtensions = /png|jpg|jpeg/;
      const ext = path.extname(file.originalname).toLowerCase();
      if (!allowedExtensions.test(ext)) {
        return cb(new Error('Formato de imagen no permitido'), false);
      }
      cb(null, true);
    }
});

// GET /categorias - para obtener todas las categorías
router.get('/categorias', getCategorias);

// GET /docentes - para obtener docentes
router.get('/docentes', getDocentes);

// POST /curso - para crear un nuevo curso con imagen
router.post('/curso', upload.single('imagen'), createCurso);

router.get('/cursos', getActiveCourses);

router.put('/curso/:id', deleteCurso);

module.exports = router;
