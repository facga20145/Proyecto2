import React, { useState, useEffect } from "react";
import "./ManageScholarships.css";
import axios from "axios";

export default function ManageScholarships() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [pendingScholarships, setPendingScholarships] = useState([]);
  const [becados, setBecados] = useState([]);

  // Obtener solicitudes pendientes
  const fetchPendingScholarships = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/scholarships/pending");
      setPendingScholarships(response.data);
    } catch (error) {
      console.error("Error al obtener solicitudes de becas:", error);
    }
  };

  // Obtener becados aprobados
  const fetchBecados = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/scholarships/list");
      setBecados(response.data);
    } catch (error) {
      console.error("Error al obtener la lista de becados:", error);
    }
  };

  // Desactivar beca
  const handleDeactivate = async (idBeca) => {
    try {
      await axios.put(`http://localhost:5000/api/scholarships/deactivate/${idBeca}`);
      alert("Beca desactivada con éxito");
      fetchBecados();
    } catch (error) {
      console.error("Error al desactivar la beca:", error);
      alert("Error al desactivar la beca");
    }
  };

  // Aprobar beca
  const handleApprove = async (idSolicitudBeca) => {
    try {
      await axios.post("http://localhost:5000/api/scholarships/approve", {
        idSolicitudBeca,
        idPlanEstudio: 1,
      });
      alert("Beca aprobada con éxito");
      fetchPendingScholarships();
      fetchBecados();
    } catch (error) {
      console.error("Error al aprobar beca:", error.response || error);
      alert("Error al aprobar beca");
    }
  };

  // Rechazar beca
  const handleReject = async (idSolicitudBeca) => {
    try {
      await axios.post("http://localhost:5000/api/scholarships/reject", { idSolicitudBeca });
      alert("Solicitud de beca rechazada");
      fetchPendingScholarships();
    } catch (error) {
      console.error("Error al rechazar solicitud:", error);
      alert("Error al rechazar solicitud");
    }
  };

  // Agregar becado
  const handleAddScholarship = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      await axios.post("http://localhost:5000/api/scholarships/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Solicitud de beca creada con éxito");
      setShowAddForm(false);
      fetchPendingScholarships();
    } catch (error) {
      console.error("Error al agregar becado:", error);
      alert("Error al agregar becado");
    }
  };

  // Inicializar datos
  useEffect(() => {
    fetchPendingScholarships();
    fetchBecados();
  }, []);

  return (
    <div className="scholarship-management">
      {/* Lista de solicitudes pendientes */}
      <div className="scholarship-list">
        <h2>Solicitudes de Becas Pendientes</h2>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo Electrónico</th>
              <th>Motivo</th>
              <th>Certificado Socioeconómico</th>
              <th>Certificado de Estudios</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pendingScholarships.length > 0 ? (
              pendingScholarships.map((scholarship) => (
                <tr key={scholarship.idSolicitudBeca}>
                  <td>{scholarship.postulante}</td>
                  <td>{scholarship.Correo}</td>
                  <td>{scholarship.motivo}</td>
                  <td>
                  <a
                      href={`http://localhost:5000${scholarship.CertificadoSocioeconomico}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="icon-btn"
                    >
                      <i className="fas fa-file-pdf"></i>
                    </a>
                  </td>
                  <td>
                  <a
                      href={`http://localhost:5000${scholarship.CertificadoEstudios}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="icon-btn"
                    >
                      <i className="fas fa-file-pdf"></i>
                    </a>
                  </td>
                  <td>
                  <button
                      className="approve-btn icon-btn"
                      onClick={() => handleApprove(scholarship.idSolicitudBeca)}
                    >
                      <i className="fas fa-check"></i>
                    </button>
                    <button
                      className="reject-btn icon-btn"
                      onClick={() => handleReject(scholarship.idSolicitudBeca)}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No hay solicitudes pendientes</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Formulario para agregar becado */}
      <div className="add-scholarship">
        <button
          className="add-scholarship-btn"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? "Cerrar Formulario" : "Agregar Solicitud de Beca"}
        </button>

        {showAddForm && (
          <form className="scholarship-form" onSubmit={handleAddScholarship}>
            <h3>Agregar Solicitud de Beca</h3>
            <div className="form-group">
              <label>Correo Electrónico:</label>
              <input type="email" name="correo" required />
            </div>
            <div className="form-group">
              <label>Teléfono:</label>
              <input type="text" name="telefono" required />
            </div>
            <div className="form-group">
              <label>Motivo:</label>
              <textarea name="motivo" required></textarea>
            </div>
            <div className="form-group">
              <label>Certificado Socioeconómico:</label>
              <input type="file" name="CertificadoSocioeconomico" accept="application/pdf" required />
            </div>
            <div className="form-group">
              <label>Certificado de Estudios:</label>
              <input type="file" name="CertificadoEstudios" accept="application/pdf" required />
            </div>
            <button type="submit" className="submit-btn">
              Guardar
            </button>
          </form>
        )}
      </div>

      {/* Lista de becados */}
      <div className="becados-list">
        <h2>Lista de Becados</h2>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo Electrónico</th>
              <th>Fecha de Inicio</th>
              <th>Fecha de Fin</th>
              <th>Activo</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {becados.length > 0 ? (
              becados.map((becado) => (
                <tr key={becado.idBeca}>
                  <td>{becado.nombre}</td>
                  <td>{becado.correo}</td>
                  <td>{new Date(becado.fechaInicio).toLocaleDateString()}</td>
                  <td>{new Date(becado.fechaFin).toLocaleDateString()}</td>
                  <td>{becado.activo}</td>
                  <td>
                    {becado.activo === "Sí" && (
                       <button
                       className="deactivate-btn icon-btn"
                       onClick={() => handleDeactivate(becado.idBeca)}
                     >
                       <i className="fas fa-trash-alt"></i>
                     </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No hay becados registrados</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
