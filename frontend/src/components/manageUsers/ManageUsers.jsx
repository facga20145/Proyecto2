import { useState, useEffect } from 'react';
import './ManageUsers.css';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Simulación de obtener usuarios
    const fetchedUsers = [
      { id: 1, name: 'Usuario 1', email: 'user1@example.com', status: 'Activo' },
      { id: 2, name: 'Usuario 2', email: 'user2@example.com', status: 'Inhabilitado' }
    ];
    setUsers(fetchedUsers);
  }, []);

  const toggleUserStatus = (id) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, status: user.status === 'Activo' ? 'Inhabilitado' : 'Activo' } : user
    ));
  };

  return (
    <div className="manage-users">
      <h1>Gestión de Usuarios</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo Electrónico</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.status}</td>
              <td>
                <button onClick={() => toggleUserStatus(user.id)}>
                  {user.status === 'Activo' ? 'Inhabilitar' : 'Rehabilitar'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
