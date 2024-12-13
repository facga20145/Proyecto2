import { useState, useEffect } from "react";
import axios from "axios";
import "./ManageUsers.css";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Número de usuarios por página

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/list");
        setUsers(response.data);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    };

    fetchUsers();
  }, []);

  const toggleUserStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "Activo" ? 0 : 1;
      await axios.put(`http://localhost:5000/api/users/update/${id}`, { status: newStatus });
      alert("Estado actualizado correctamente");
      const updatedUsers = users.map((user) =>
        user.id === id ? { ...user, status: newStatus === 1 ? "Activo" : "Inhabilitado" } : user
      );
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
    }
  };

  // Lógica de paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="manage-users">
      <h1>Gestión de Usuarios</h1>
      <table>
        <thead>
          <tr>
            <th className="col-nombre">Nombre</th>
            <th className="col-correo">Correo Electrónico</th>
            <th className="col-edad">Edad</th>
            <th className="col-beca">Becado</th>
            <th className="col-plan">Plan</th>
            <th className="col-estado">Estado</th>
            <th className="col-acciones">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td className="col-nombre">{user.name}</td>
              <td className="col-correo">{user.email}</td>
              <td className="col-edad">{user.age}</td>
              <td className="col-beca">{user.becado}</td>
              <td className="col-plan">{user.plan}</td>
              <td className="col-estado">{user.status}</td>
              <td className="col-acciones">
                <button
                  onClick={() => toggleUserStatus(user.id, user.status)}
                  className={user.status === "Activo" ? "inhabilitar" : "rehabilitar"}
                >
                  {user.status === "Activo" ? "Inhabilitar" : "Rehabilitar"}
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
    </div>
  );
}
