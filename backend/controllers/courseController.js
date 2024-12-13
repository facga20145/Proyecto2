const db = require('../config/db.js');

exports.getCategorias = (req, res) => {
  const sql = "SELECT idCategoria, NombreCategoria FROM categoria";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error al obtener categorías:", err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
    res.json(results);
  });
};

exports.createCurso = (req, res) => {
    const {
      name: nombre_curso,
      descripcion,
      category: idCategoria,
      ClasificacionEdad,
      price: precio,
      duration: duracion,
      videoLink: Enlace
    } = req.body;
  
    let imagen = '';
    if (req.file) {
      imagen = 'uploads/cursos/' + req.file.filename;
    }
  
    // estado = 1 por defecto
    const estado = 1; 
  
    const sql = `
      INSERT INTO curso (nombre_curso, descripcion, precio, duracion, ClasificacionEdad, Enlace, idCategoria, imagen, estado) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [nombre_curso, descripcion, precio, duracion, ClasificacionEdad, Enlace, idCategoria, imagen, estado];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error al insertar curso:", err);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }
      res.json({ message: 'Curso creado con éxito', cursoId: result.insertId });
    });
  };
  

exports.getDocentes = (req, res) => {
  const sql = "SELECT idUsuario, Nombre FROM usuario WHERE rol = 'docente'";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error al obtener docentes:", err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
    res.json(results);
  });
};

exports.getActiveCourses = (req, res) => {
    const sql = "SELECT idCurso, nombre_curso, precio, imagen FROM curso WHERE estado = 1";
    db.query(sql, (err, results) => {
      if (err) {
        console.error("Error al obtener cursos activos:", err);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }
      res.json(results);
    });
  };
  
  exports.deleteCurso = (req, res) => {
    const { id } = req.params;
    const sql = "UPDATE curso SET estado = 0 WHERE idCurso = ?";
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error("Error al eliminar curso:", err);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }
      res.json({ message: 'Curso eliminado con éxito' });
    });
  };
  