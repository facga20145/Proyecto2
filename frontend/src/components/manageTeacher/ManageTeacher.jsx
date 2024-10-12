import { useState, useEffect } from "react";
import axios from "axios"; // Asegúrate de importar axios
import "./ManageTeacher.css";
import generatePasswordIcon from "../images/refresh.png";

export default function ManageTeacher() {
  const [teacher, setTeacher] = useState([]); // Estado para la lista de docentes
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [password, setPassword] = useState("");

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const handleAddTeacher = async (e) => {
    e.preventDefault();
    const newTeacher = {
      nombre: e.target.nombre.value,
      apellido: e.target.apellido.value,
      email: e.target.email.value,
      contrasena: password,
      status: "Active",
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/teachers/add",
        newTeacher
      );
      alert("Docente agregado correctamente");
      setTeacher([...teacher, response.data]); // Actualiza el estado con el nuevo docente
    } catch (error) {
      console.error("Error al agregar el docente:", error);
      alert("Hubo un error al agregar el docente");
    }
  };
  // Obtener los docentes cuando el componente se monta
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/teachers/list"
        );
        console.log(response.data); // Verifica aquí los datos que recibes
        setTeacher(response.data);
      } catch (error) {
        console.error("Error al obtener la lista de docentes:", error);
      }
    };

    fetchTeachers();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEditTeacher = async (teacherId, newStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/teachers/update/${teacherId}`, // Asegúrate de que el ID sea correcto
        {
          status: newStatus,
        }
      );
      alert("Estado del docente actualizado correctamente");
      setTeacher(
        teacher.map((t) =>
          t.id === teacherId ? { ...t, status: newStatus } : t
        )
      );
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
    (teacher) =>
      teacher.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTeachers = filteredTeachers.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
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

      {showAddForm && (
        <form className="manage-teacher-form" onSubmit={handleAddTeacher}>
          <h2>Agregar Docente</h2>
          <label>Nombre:</label>
          <input type="text" name="nombre" required />
          <label>Apellido:</label>
          <input type="text" name="apellido" required />
          <label>Correo:</label>
          <input type="email" name="email" required />

          <label>Contraseña:</label>
          <div className="password-container">
            <input
              type="text"
              name="contrasena"
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
                  <th className="col-contraseña">Contraseña</th>
                  <th className="col-estado">Estado</th>
                  <th className="col-acciones">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {currentTeachers.map((teacher, index) => (
                  <tr key={index}>
                    <td className="col-numero">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="col-nombre">
                      {teacher.nombre} {teacher.apellido}
                    </td>
                    <td className="col-correo">{teacher.email}</td>
                    <td className="col-contraseña">{teacher.contrasena}</td>
                    <td className="col-estado">
                      <span
                        className={`status ${
                          teacher.status
                            ? teacher.status.toLowerCase()
                            : "unknown"
                        }`}
                      >
                        {teacher.status ? teacher.status : "Unknown"}
                      </span>
                    </td>
                    <td className="col-acciones">
                      <button
                        className="edit-btn"
                        onClick={() =>
                          handleEditTeacher(
                            teacher.id,
                            teacher.status === "activo" ? "inactivo" : "activo"
                          )
                        }
                      >
                        {teacher.status === "activo"
                          ? "Deshabilitar"
                          : "Habilitar"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
