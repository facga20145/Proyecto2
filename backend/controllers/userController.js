const connection = require("../config/db.js");

exports.getUsers = (req, res) => {
  const query = `
    SELECT 
      u.idUsuario AS id,
      CONCAT(u.Nombre, ' ', u.Apellido) AS name,
      u.Correo AS email,
      TIMESTAMPDIFF(YEAR, u.FechaNacimiento, CURDATE()) AS age,
      CASE 
        WHEN b.Activo = 1 THEN 'Sí'
        ELSE 'No'
      END AS becado,
      CASE 
        WHEN b.Activo = 1 THEN p.nombre_plan
        ELSE 'No'
      END AS plan,
      CASE 
        WHEN u.Estado = 1 THEN 'Activo'
        ELSE 'Inhabilitado'
      END AS status
    FROM usuario u
    LEFT JOIN solicitudbeca sb ON u.idUsuario = sb.idUsuario
    LEFT JOIN beca b ON sb.idSolicitudBeca = b.idSolicitudBeca AND b.Activo = 1
    LEFT JOIN planestudio p ON b.idPlanEstudio = p.idPlanEstudio
    WHERE u.Rol = 'cliente';
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error al obtener usuarios:", err);
      return res.status(500).json({ error: "Error interno del servidor" });
    }

    res.status(200).json(results);
  });
};

exports.updateUserStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const query = "UPDATE usuario SET Estado = ? WHERE idUsuario = ?";
  connection.query(query, [status, id], (err, results) => {
    if (err) {
      console.error("Error al actualizar estado del usuario:", err);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
    res.status(200).json({ message: "Estado del usuario actualizado" });
  });
};