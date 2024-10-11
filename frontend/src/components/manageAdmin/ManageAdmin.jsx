import { useState } from "react";
import "./ManageAdmin.css";
import generatePasswordIcon from "../images/refresh.png"; // Icono de generar contraseña

export default function ManageAdmin() {
  const [admins, setAdmins] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false); // Para controlar si mostrar o no el formulario
  const [searchTerm, setSearchTerm] = useState(""); // Para la barra de búsqueda
  const [password, setPassword] = useState(""); // Estado para la contraseña

  const handleAddAdmin = (e) => {
    e.preventDefault();
    const newAdmin = {
      name: e.target.name.value,
      apellido: e.target.apellido.value,
      correo: e.target.correo.value,
      password: password, // Contraseña generada
      image: e.target.image.files[0],
      status: "Active",
    };
    setAdmins([...admins, newAdmin]);
    e.target.reset();
    setPassword(""); // Limpiar la contraseña después de agregar
    setShowAddForm(false); // Ocultar el formulario después de agregar el admin
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEditAdmin = (index) => {
    alert(`Editar admin: ${admins[index].name}`);
  };

  const generateRandomPassword = () => {
    const randomPassword = Math.random().toString(36).slice(-8); // Generar una contraseña aleatoria
    setPassword(randomPassword);
  };

  const filteredAdmins = admins.filter(
    (admin) =>
      admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.correo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="manage-admin-container">
      <div className="header">
        <h2>Administradores</h2>
        <div className="actions">
          <input
            type="text"
            placeholder="Buscar administradores..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          <button
            className="add-admin-btn"
            onClick={() => setShowAddForm(true)}
          >
            + Agregar Administrador
          </button>
        </div>
      </div>

      {/* Mostrar el formulario para agregar un nuevo administrador */}
      {showAddForm && (
        <form className="manage-admin-form" onSubmit={handleAddAdmin}>
          <h2>Agregar Administrador</h2>
          <label>Nombre:</label>
          <input type="text" name="name" required />
          <label>Apellido:</label>
          <input type="text" name="apellido" required />
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

          <label>Subir Imagen del Administrador:</label>
          <input type="file" name="image" accept="image/*" required />
          <button type="submit" className="submit-btn">
            Guardar
          </button>
        </form>
      )}

      {/* Tabla de administradores */}
      <div className="admin-list">
        {admins.length === 0 ? (
          <p>No hay administradores creados.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th className="col-numero">#</th>
                <th className="col-nombre">Nombre</th>
                <th className="col-correo">Correo</th>
                <th className="col-contraseña">Contraseña</th>
                <th className="col-estado">Estado</th>
                <th className="col-acciones">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredAdmins.map((admin, index) => (
                <tr key={index}>
                  <td className="col-numero">{index + 1}</td>
                  <td className="col-nombre">{admin.name} {admin.apellido}</td>
                  <td className="col-correo">{admin.correo}</td>
                  <td className="col-contraseña">{admin.password}</td>
                  <td className="col-estado">
                    <span className={`status ${admin.status.toLowerCase()}`}>
                      {admin.status}
                    </span>
                  </td>
                  <td className="col-acciones">
                    <button className="edit-btn">Editar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
