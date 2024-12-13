import { useState, useEffect } from "react";
import axios from "axios";
import "./ManageAdmin.css";
import generatePasswordIcon from "../images/refresh.svg";

export default function ManageAdmin() {
  const [admins, setAdmins] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [password, setPassword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchAdmins = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admins/list");
      const data = response.data.map((admin) => ({
        id: admin.idUsuario,
        nombre: admin.Nombre,
        apellido: admin.Apellido,
        correo: admin.Correo,
        contrasena: admin.Contrasena,
        status: admin.Estado === 1 ? "activo" : "inactivo",
      }));
      setAdmins(data);
    } catch (error) {
      console.error("Error al obtener administradores:", error);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    const newAdmin = {
      nombre: e.target.nombre.value.trim(),
      apellido: e.target.apellido.value.trim(),
      fecha_nacimiento: e.target.fecha_nacimiento.value,
      genero: e.target.genero.value,
      correo: e.target.correo.value.trim(),
      password: password.trim(),
    };

    try {
      await axios.post("http://localhost:5000/api/admins/add", newAdmin);
      alert("Administrador agregado correctamente");
      fetchAdmins();
      setShowAddForm(false);
    } catch (error) {
      console.error("Error al agregar el administrador:", error.response || error);
      alert("Hubo un error al agregar el administrador");
    }
  };

  const handleEditAdmin = async (adminId, currentStatus) => {
    try {
      const newStatus = currentStatus === "activo" ? 0 : 1;
      await axios.put(`http://localhost:5000/api/admins/update/${adminId}`, {
        status: newStatus,
      });
      alert("Estado del administrador actualizado correctamente");
      fetchAdmins();
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
    }
  };

  const generateRandomPassword = () => {
    const randomPassword = Math.random().toString(36).slice(-8);
    setPassword(randomPassword);
  };

  const filteredAdmins = admins.filter(
    (admin) =>
      admin.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.correo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAdmins = filteredAdmins.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAdmins.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="manage-admin-container">
      <div className="header">
        <h2>Administradores</h2>
        <div className="actions">
          <input
            type="text"
            placeholder="Buscar Administradores..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="add-admin-btn" onClick={() => setShowAddForm(true)}>
            + Agregar Administrador
          </button>
        </div>
      </div>

      {showAddForm && (
        <form className="manage-admin-form" onSubmit={handleAddAdmin}>
          <h2>Agregar Administrador</h2>
          <label>Nombre:</label>
          <input type="text" name="nombre" required />
          <label>Apellido:</label>
          <input type="text" name="apellido" required />
          <label>Fecha de Nacimiento:</label>
          <input type="date" name="fecha_nacimiento" required />
          <label>Género:</label>
          <select name="genero" required>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
          </select>
          <label>Correo:</label>
          <input type="email" name="correo" required />
          <label>Contraseña:</label>
          <div className="password-container">
            <input
              type="text"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <img
              src={generatePasswordIcon}
              alt="Generar Contraseña"
              className="generate-password-icon"
              onClick={generateRandomPassword}
            />
          </div>
          <button type="submit" className="submit-btn">
            Guardar
          </button>
        </form>
      )}

      <div className="admin-list">
        {admins.length === 0 ? (
          <p>No hay administradores creados.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Contraseña</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentAdmins.map((admin, index) => (
                <tr key={admin.id}>
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td>{admin.nombre} {admin.apellido}</td>
                  <td>{admin.correo}</td>
                  <td>{admin.contrasena}</td>
                  <td>
                    <span
                      className={`status ${admin.status === "activo" ? "activo" : "inactivo"
                        }`}
                    >
                      {admin.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className={`edit-btn ${admin.status === "activo" ? "active" : "inactive"}`}
                      onClick={() => handleEditAdmin(admin.id, admin.status)}
                    >
                      {admin.status === "activo" ? "Deshabilitar" : "Habilitar"}
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={currentPage === i + 1 ? "active" : ""}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
