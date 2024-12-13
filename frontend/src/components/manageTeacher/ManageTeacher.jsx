import { useState, useEffect } from "react";
import axios from "axios";
import "./ManageTeacher.css";
import generatePasswordIcon from "../images/refresh.svg";

export default function ManageTeacher() {
  const [teacher, setTeacher] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [password, setPassword] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Función para obtener la lista de docentes
  const fetchTeachers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/teachers/list");
      const data = response.data.map((teacher) => ({
        id: teacher.idUsuario,
        nombre: teacher.Nombre,
        apellido: teacher.Apellido,
        email: teacher.Correo,
        contrasena: teacher.Contrasena,
        status: teacher.Estado === 1 ? "activo" : "inactivo", // Interpretar 1 como activo y 0 como inactivo
      }));
      setTeacher(data);
    } catch (error) {
      console.error("Error al obtener la lista de docentes:", error);
    }
  };

  const handleAddTeacher = async (e) => {
    e.preventDefault();
    const newTeacher = {
      nombre: e.target.nombre.value,
      apellido: e.target.apellido.value,
      correo: e.target.email.value,
      fecha_nacimiento: e.target.fecha_nacimiento.value,
      genero: e.target.genero.value,
      password,
      status: "activo",
    };
    console.log(newTeacher);
    try {
      await axios.post("http://localhost:5000/api/teachers/add", newTeacher);
      alert("Docente agregado correctamente");
      fetchTeachers(); // Actualizar la lista después de agregar
      setShowAddForm(false);
    } catch (error) {
      console.error("Error al agregar el docente:", error.response || error);
      alert("Hubo un error al agregar el docente");
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEditTeacher = async (teacherId, currentStatus) => {
    try {
      const newStatus = currentStatus === "activo" ? 0 : 1; // Cambiar el estado
      await axios.put(`http://localhost:5000/api/teachers/update/${teacherId}`, {
        status: newStatus,
      });
      alert("Estado del docente actualizado correctamente");
      fetchTeachers(); // Refrescar la lista de docentes
    } catch (error) {
      console.error("Error al actualizar el estado del docente:", error);
      alert("Hubo un error al actualizar el estado del docente");
    }
  };

  const generateRandomPassword = () => {
    const randomPassword = Math.random().toString(36).slice(-8);
    setPassword(randomPassword);
  };

  const filteredTeachers = teacher.filter(
    (t) =>
      (t.nombre && t.nombre.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (t.email && t.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
          <button className="add-teacher-btn" onClick={() => setShowAddForm(true)}>
            + Agregar Docente
          </button>
        </div>
      </div>

      {showAddForm && (
        <form className="manage-teacher-form" onSubmit={handleAddTeacher}>
          <h2>Agregar Docente</h2>
          <label>Nombre:</label>
          <input type="text" name="nombre" required />
          <label>Apellido:</label>
          <input type="text" name="apellido" required />
          <label>Correo:</label>
          <input type="email" name="email" required />
          <label>Fecha nacimiento:</label>
          <input type="date" name="fecha_nacimiento" required />
          <label>Genero:</label>
          <select name="genero" required>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
          </select>

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
                  <th className="col-hashed-password">Contraseña</th>
                  <th className="col-estado">Estado</th>
                  <th className="col-acciones">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {currentTeachers.map((teacher, index) => (
                  <tr key={teacher.id}>
                    <td className="col-numero">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td className="col-nombre">
                      {teacher.nombre} {teacher.apellido}
                    </td>
                    <td className="col-correo">{teacher.email}</td>
                    <td className="col-hashed-password">{teacher.contrasena}</td>
                    <td className="col-estado">
                      <span className={`status ${teacher.status}`}>
                        {teacher.status}
                      </span>
                    </td>
                    <td className="col-acciones">
  <button
    className={`edit-btn ${teacher.status === "activo" ? "active" : "inactive"}`}
    onClick={() => handleEditTeacher(teacher.id, teacher.status)}
  >
    {teacher.status === "activo" ? "Deshabilitar" : "Habilitar"}
  </button>
</td>

                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination">
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i + 1} onClick={() => handlePageChange(i + 1)} className={currentPage === i + 1 ? "active" : ""}>
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
