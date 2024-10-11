import { useState } from "react";
import "./ManageTeacher.css";
import generatePasswordIcon from "../images/refresh.png";

export default function ManageTeacher() {
  const [teacher, setTeacher] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false); // Para controlar si mostrar o no el formulario
  const [searchTerm, setSearchTerm] = useState(""); // Para la barra de búsqueda
  const [password, setPassword] = useState(""); // Estado para la contraseña

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Número de profesores por página

  const handleAddTeacher = (e) => {
    e.preventDefault();
    const newTeacher = {
      name: e.target.name.value,
      apellido: e.target.apellido.value,
      correo: e.target.correo.value,
      password: password, // Contraseña generada
      status: "Active",
    };
    setTeacher([...teacher, newTeacher]);
    e.target.reset();
    setPassword("");
    setShowAddForm(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  //boton editar no hace nada aun
  const handleEditTeacher = (index) => {
    alert(`Editar Profesor: ${teacher[index].name}`);
  };

  const generateRandomPassword = () => {
    const randomPassword = Math.random().toString(36).slice(-8); // Generar una contraseña aleatoria
    setPassword(randomPassword);
  };

  const filteredTeachers = teacher.filter(
    (teacher) =>
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.correo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Lógica de paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTeachers = filteredTeachers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="manage-teacher-container">
      <div className="header">
        <h2>Docentes</h2>
        <div className="actions">
          <input
            type="text"
            placeholder="Buscar Docentes..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          <button
            className="add-teacher-btn"
            onClick={() => setShowAddForm(true)}
          >
            + Agregar Docente
          </button>
        </div>
      </div>

      {/* Mostrar el formulario para agregar un nuevo Docente */}
      {showAddForm && (
        <form className="manage-teacher-form" onSubmit={handleAddTeacher}>
          <h2>Agregar Docente</h2>
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
          <button type="submit" className="submit-btn">
            Guardar
          </button>
        </form>
      )}

      {/* Tabla de Docentes */}
      <div className="teacher-list">
        {teacher.length === 0 ? (
          <p>No hay Docentes creados.</p>
        ) : (
          <>
            <table className="teacher-table">
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
                {currentTeachers.map((teacher, index) => (
                  <tr key={index}>
                    <td className="col-numero">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td className="col-nombre">{teacher.name} {teacher.apellido}</td>
                    <td className="col-correo">{teacher.correo}</td>
                    <td className="col-contraseña">{teacher.password}</td>
                    <td className="col-estado">
                      <span className={`status ${teacher.status.toLowerCase()}`}>
                        {teacher.status}
                      </span>
                    </td>
                    <td className="col-acciones">
                      <button className="edit-btn">Editar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Controles de paginación */}
            <div className="pagination">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={currentPage === i + 1 ? "active" : ""}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
