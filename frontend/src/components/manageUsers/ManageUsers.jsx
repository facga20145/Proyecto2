import { useState, useEffect } from 'react';
import './ManageUsers.css';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Número de usuarios por página

  useEffect(() => {
    // Simulación de datos de usuarios
    const fetchedUsers = [
      { id: 1, name: 'Facundo Godoy Mejia', email: 'user1@example.com', status: 'Activo', age: 25, scholarship: 'No', plan: 'Premium' },
      { id: 2, name: 'Usuario 2', email: 'user2@example.com', status: 'Inhabilitado', age: 12, scholarship: 'Sí', plan: 'Basic' },
      { id: 3, name: 'Usuario 3', email: 'user3@example.com', status: 'Activo', age: 17, scholarship: 'No', plan: 'Standard' },
      { id: 4, name: 'Usuario 4', email: 'user4@example.com', status: 'Activo', age: 30, scholarship: 'Sí', plan: 'Premium' },
      { id: 5, name: 'Usuario 5', email: 'user5@example.com', status: 'Inhabilitado', age: 9, scholarship: 'No', plan: 'Basic' },
      { id: 6, name: 'Usuario 6', email: 'user6@example.com', status: 'Activo', age: 20, scholarship: 'No', plan: 'Standard' }
    ];
    setUsers(fetchedUsers);
  }, []);

  const toggleUserStatus = (id) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, status: user.status === 'Activo' ? 'Inhabilitado' : 'Activo' } : user
    ));
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
            <th className='col-nombre'>Nombre</th>
            <th className='col-correo'>Correo Electrónico</th>
            <th className='col-edad'>Edad</th>
            <th className='col-beca'>Becado</th>
            <th className='col-plan'>Plan</th>
            <th className='col-estado'>Estado</th>
            <th className='col-acciones'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map(user => (
            <tr key={user.id}>
              <td className='col-nombre'>{user.name}</td>
              <td className='col-correo'>{user.email}</td>
              <td className='col-edad'>{user.age}</td>
              <td className='col-beca'>{user.scholarship}</td>
              <td className='col-plan'>{user.plan}</td>
              <td className='col-estado'>{user.status}</td>
              <td className='col-acciones'>
                <button
                  onClick={() => toggleUserStatus(user.id)}
                  className={user.status === 'Activo' ? 'inhabilitar' : 'rehabilitar'}
                >
                  {user.status === 'Activo' ? 'Inhabilitar' : 'Rehabilitar'}
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
            className={currentPage === i + 1 ? 'active' : ''}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
