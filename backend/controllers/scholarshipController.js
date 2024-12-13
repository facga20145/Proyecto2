const connection = require("../config/db.js");
const path = require("path");
const fs = require("fs");

// Obtener solicitudes de becas pendientes
exports.getPendingScholarships = (req, res) => {
  const query = `
    SELECT 
      sb.idSolicitudBeca,
      CONCAT(u.Nombre, ' ', u.Apellido) AS postulante,
      u.Correo,
      sb.motivo,
      sb.CertificadoSocioeconomico AS CertificadoSocioeconomico,
sb.CertificadoEstudios AS CertificadoEstudios,

      sb.estado
    FROM solicitudbeca sb
    JOIN usuario u ON sb.idUsuario = u.idUsuario
    WHERE sb.estado = 'Pendiente'
  `;
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error al obtener solicitudes de becas:", err);
      return res.status(500).json({ error: "Error en el servidor" });
    }
    res.status(200).json(results);
  });
};

// Obtener la lista de becados
exports.getBecados = (req, res) => {
  const query = `
    SELECT 
      b.idBeca,
      CONCAT(u.Nombre, ' ', u.Apellido) AS nombre,
      u.Correo AS correo,
      b.fechaInicio,
      b.fechaFin,
      CASE WHEN b.Activo = 1 THEN 'Sí' ELSE 'No' END AS activo
    FROM beca b
    JOIN solicitudbeca sb ON b.idSolicitudBeca = sb.idSolicitudBeca
    JOIN usuario u ON sb.idUsuario = u.idUsuario
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error al obtener la lista de becados:", err);
      return res.status(500).json({ error: "Error en el servidor" });
    }
    res.status(200).json(results);
  });
};


// Aprobar una solicitud de beca
exports.approveScholarship = (req, res) => {
  const { idSolicitudBeca } = req.body;

  const idPlanEstudio = 1; // Plan fijo
  const queryInsertBeca = `
    INSERT INTO beca (idSolicitudBeca, idPlanEstudio, tipoBeca, descuento, fechaInicio, fechaFin, Activo)
    VALUES (?, ?, 'Completa', 100, NOW(), DATE_ADD(NOW(), INTERVAL 1 YEAR), 1)
  `;
  const queryUpdateSolicitud = `
    UPDATE solicitudbeca SET estado = 'Aceptado' WHERE idSolicitudBeca = ?
  `;

  connection.query(queryInsertBeca, [idSolicitudBeca, idPlanEstudio], (err) => {
    if (err) {
      console.error("Error al aprobar beca:", err);
      return res.status(500).json({ error: "Error en el servidor" });
    }

    connection.query(queryUpdateSolicitud, [idSolicitudBeca], (err) => {
      if (err) {
        console.error("Error al actualizar estado de la solicitud:", err);
        return res.status(500).json({ error: "Error en el servidor" });
      }

      res.status(200).json({ message: "Beca aprobada con éxito" });
    });
  });
};


// Rechazar una solicitud de beca
exports.rejectScholarship = (req, res) => {
  const { idSolicitudBeca } = req.body;

  const query = `
    UPDATE solicitudbeca SET estado = 'Rechazado' WHERE idSolicitudBeca = ?
  `;

  connection.query(query, [idSolicitudBeca], (err) => {
    if (err) {
      console.error("Error al rechazar solicitud de beca:", err);
      return res.status(500).json({ error: "Error en el servidor" });
    }

    res.status(200).json({ message: "Solicitud de beca rechazada" });
  });
};

// Agregar una nueva solicitud de beca
exports.addScholarshipRequest = (req, res) => {
  const { idUsuario, motivo } = req.body;

  const query = `
    INSERT INTO solicitudbeca (idUsuario, motivo, estado)
    VALUES (?, ?, 'Pendiente')
  `;

  connection.query(query, [idUsuario, motivo], (err) => {
    if (err) {
      console.error("Error al agregar solicitud de beca:", err);
      return res.status(500).json({ error: "Error en el servidor" });
    }

    res.status(201).json({ message: "Solicitud de beca creada con éxito" });
  });
};

exports.deactivateBeca = (req, res) => {
  console.log("ID de beca recibido:", req.params.idBeca); // Verifica el ID recibido
  const { idBeca } = req.params;

  const query = `
    UPDATE beca 
    SET Activo = 0 
    WHERE idBeca = ?
  `;

  connection.query(query, [idBeca], (err, result) => {
    if (err) {
      console.error("Error al desactivar la beca:", err);
      return res.status(500).json({ error: "Error en el servidor" });
    }

    console.log("Resultado del query:", result); // Log del resultado de la query

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Beca no encontrada" });
    }

    res.status(200).json({ message: "Beca desactivada con éxito" });
  });
};

// Agregar una nueva solicitud de beca
exports.addScholarshipRequest = (req, res) => {
  const { correo, telefono, motivo } = req.body;
  const certificadoSocioeconomico = req.files?.CertificadoSocioeconomico;
  const certificadoEstudios = req.files?.CertificadoEstudios;

  // Validar que los archivos existan
  if (!certificadoSocioeconomico || !certificadoEstudios) {
    return res.status(400).json({ error: "Ambos certificados son obligatorios" });
  }

  // Ruta donde se guardarán los archivos
  const uploadPath = "C:/xampp/htdocs/Pagina_Cursos_online/uploads/documentos";

  // Verificar si el directorio existe, si no, crearlo
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  // Guardar los archivos en el directorio
  const socioeconomicoPath = path.join(uploadPath, certificadoSocioeconomico.name);
  const estudiosPath = path.join(uploadPath, certificadoEstudios.name);

  certificadoSocioeconomico.mv(socioeconomicoPath, (err) => {
    if (err) {
      console.error("Error al guardar Certificado Socioeconómico:", err);
      return res.status(500).json({ error: "Error al guardar archivo socioeconómico" });
    }

    certificadoEstudios.mv(estudiosPath, async (err) => {
      if (err) {
        console.error("Error al guardar Certificado de Estudios:", err);
        return res.status(500).json({ error: "Error al guardar archivo de estudios" });
      }

      // Obtener el ID del usuario basado en el correo
      const userQuery = "SELECT idUsuario FROM usuario WHERE Correo = ?";
      connection.query(userQuery, [correo], (err, results) => {
        if (err || results.length === 0) {
          console.error("Error al obtener ID del usuario:", err);
          return res.status(404).json({ error: "Usuario no encontrado" });
        }

        const idUsuario = results[0].idUsuario;

        // Insertar la solicitud de beca
        const insertQuery = `
          INSERT INTO solicitudbeca (idUsuario, CertificadoSocioeconomico, CertificadoEstudios, Teléfono, motivo, estado)
          VALUES (?, ?, ?, ?, ?, 'Pendiente')
        `;
        connection.query(
          insertQuery,
          [idUsuario, `/uploads/documentos/${certificadoSocioeconomico.name}`, `/uploads/documentos/${certificadoEstudios.name}`, telefono, motivo],
          (err) => {
            if (err) {
              console.error("Error al insertar solicitud de beca:", err);
              return res.status(500).json({ error: "Error al guardar la solicitud de beca" });
            }

            res.status(201).json({ message: "Solicitud de beca creada con éxito" });
          }
        );
      });
    });
  });
};