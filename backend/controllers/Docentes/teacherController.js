const connection = require("../../config/db.js"); 
const bcrypt = require("bcrypt"); 


exports.addTeacher = async (req, res) => {
  const { nombre, apellido, correo, password } = req.body;

  try {
    // Verificar si el correo ya existe en la base de datos
    const queryCheckEmail = "SELECT * FROM users WHERE email = ?";
    connection.query(queryCheckEmail, [correo], async (err, results) => {
      if (err) {
        console.error("Error en la consulta a la base de datos:", err);
        return res.status(500).json({ message: "Error en el servidor" });
      }

      if (results.length > 0) {
        return res.status(400).json({ message: "El correo ya está registrado" });
      }

      // Cifrar la contraseña antes de guardarla
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insertar el nuevo docente en la base de datos con el rol 'docente' y estado 'activo'
      const queryInsertTeacher =
        "INSERT INTO users (nombre, apellido, email, contrasena, rol, status) VALUES (?, ?, ?, ?, 'docente', 'activo')";
      connection.query(
        queryInsertTeacher,
        [nombre, apellido, correo, hashedPassword],
        (err, result) => {
          if (err) {
            console.error("Error al agregar al docente:", err);
            return res.status(500).json({ message: "Error en el servidor" });
          }

          // Devolver una respuesta exitosa al cliente
          return res.status(201).json({ message: "Docente agregado exitosamente con estado activo" });
        }
      );
    });
  } catch (error) {
    console.error("Error al agregar al docente:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

// Controlador para obtener todos los docentes
exports.getTeachers = (req, res) => {
  const query = "SELECT id, nombre, apellido, email, contrasena, status FROM users WHERE rol = 'docente'";  
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error al obtener docentes:", err);
      return res.status(500).json({ message: "Error en el servidor" });
    }

    // Devolver la lista de docentes con su estado
    return res.status(200).json(results);
  });
};

exports.updateTeacherStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const queryUpdateStatus = "UPDATE users SET status = ? WHERE id = ?";
  connection.query(queryUpdateStatus, [status, id], (err, result) => {
    if (err) {
      console.error("Error al actualizar el estado del docente:", err);
      return res.status(500).json({ message: "Error en el servidor" });
    }
    return res.status(200).json({ message: "Estado del docente actualizado" });
  });
};
