import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';

export default function AdminDashboard() {
  const [showUsersMenu, setShowUsersMenu] = useState(false);
  const [showCoursesMenu, setShowCoursesMenu] = useState(false);

  const toggleUsersMenu = () => {
    setShowUsersMenu(!showUsersMenu);
  };

  const toggleCoursesMenu = () => {
    setShowCoursesMenu(!showCoursesMenu);
  };

  return (
    <div className="admin-dashboard">
      <h1>Panel de Administración</h1>
      <div className="admin-main-options">
        {/* Botón de Gestión de Usuarios */}
        <div className="admin-option" onClick={toggleUsersMenu}>
          <p>Gestión de Usuarios</p>
          {/* Submenú de Usuarios */}
          {showUsersMenu && (
            <div className="admin-submenu">
              <Link to="/admin/manage-users">Gestión de Clientes</Link>
              <Link to="/admin/manage-scholarships">Gestión de Becas</Link>
            </div>
          )}
        </div>

        {/* Botón de Gestión de Cursos */}
        <div className="admin-option" onClick={toggleCoursesMenu}>
          <p>Gestión de Cursos</p>
          {/* Submenú de Cursos */}
          {showCoursesMenu && (
            <div className="admin-submenu">
              <Link to="/admin/upload-videos">Subida de Videos</Link>
              <Link to="/admin/courses">Vista General de Cursos</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}