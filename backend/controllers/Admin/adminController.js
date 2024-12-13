const connection = require("../../config/db.js");
const bcrypt = require("bcrypt");

exports.addAdmin = async (req, res) => {
    const { nombre, apellido, fecha_nacimiento, genero, correo, password } = req.body;
  
    // Validación de campos obligatorios
    if (!nombre || !apellido || !fecha_nacimiento || !genero || !correo || !password) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const queryInsertAdmin = `
        INSERT INTO usuario (Nombre, Apellido, FechaNacimiento, Genero, Correo, Contrasena, Rol) 
        VALUES (?, ?, ?, ?, ?, ?, 'administrador')
      `;
      connection.query(
        queryInsertAdmin,
        [nombre, apellido, fecha_nacimiento, genero, correo, hashedPassword],
        (err, result) => {
          if (err) {
            console.error("Error al agregar el administrador:", err);
            return res.status(500).json({ message: "Error interno del servidor" });
          }
          res.status(201).json({ message: "Administrador agregado exitosamente" });
        }
      );
    } catch (err) {
      console.error("Error al cifrar la contraseña:", err);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  };
  

exports.getAdmins = (req, res) => {
  const query = `
    SELECT idUsuario, Nombre, Apellido, Correo, Contrasena, 
           CAST(Estado AS UNSIGNED) AS Estado 
    FROM usuario 
    WHERE Rol = 'administrador'
  `;
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error al obtener administradores:", err);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
    res.status(200).json(results);
  });
};

exports.updateAdminStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const queryUpdateStatus = "UPDATE usuario SET Estado = ? WHERE idUsuario = ?";
  connection.query(queryUpdateStatus, [status, id], (err, result) => {
    if (err) {
      console.error("Error al actualizar el estado del administrador:", err);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
    res.status(200).json({ message: "Estado del administrador actualizado" });
  });
};
