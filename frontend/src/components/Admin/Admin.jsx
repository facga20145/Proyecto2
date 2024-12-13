import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import logo from "../images/Logo-White.svg";
import ManageUsers from "../manageUsers/ManageUsers";
import ManageScholarships from "../becas/ManageScholarships";
import ManageCourses from "../CrearCurso/ManageCourses";
import ManageAdmin from "../manageAdmin/ManageAdmin";
import ManageTeacher from "../manageTeacher/ManageTeacher";
import Graphics from "../graphics/Graphics";

export default function Admin() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigate = useNavigate(); // Hook para redirigir

  const handleSectionChange = (section) => {
    if (section === "CerrarSesion") {
      // Redirige a la pantalla inicial al cerrar sesión
      navigate("/");
    } else {
      setActiveSection(section);
      setIsSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderContent = () => {
    switch (activeSection) {
      case "Usuarios":
        return <ManageUsers />;
      case "Becas":
        return <ManageScholarships />;
      case "Graficos":
        return <Graphics />;
      case "GestionDocentes":
        return <ManageTeacher />;
      case "CrearCursos":
        return <ManageCourses />;
      case "CrearAdministradores":
        return <ManageAdmin />;
      default:
        return <p>Selecciona una opción</p>;
    }
  };

  return (
    <div className="adminPanelContainer">
      <button className="hamburger" onClick={toggleSidebar}>
        ☰
      </button>

      <div className={`adminSidebar ${isSidebarOpen ? "responsive" : ""}`}>
        <img src={logo} alt="Admin" className="adminImage" />
        <ul>
          <li onClick={() => handleSectionChange("Usuarios")} className={activeSection === "Usuarios" ? "active" : ""}>
            Usuarios
          </li>
          <li onClick={() => handleSectionChange("Becas")} className={activeSection === "Becas" ? "active" : ""}>
            Becas
          </li>
          <li onClick={() => handleSectionChange("Graficos")} className={activeSection === "Graficos" ? "active" : ""}>
            Graficos
          </li>
          <li onClick={() => handleSectionChange("GestionDocentes")} className={activeSection === "GestionDocentes" ? "active" : ""}>
            Gestión de Docentes
          </li>
          <li onClick={() => handleSectionChange("CrearCursos")} className={activeSection === "CrearCursos" ? "active" : ""}>
            Crear Cursos
          </li>
          <li onClick={() => handleSectionChange("CrearAdministradores")} className={activeSection === "CrearAdministradores" ? "active" : ""}>
            Crear Administradores
          </li>
          <li onClick={() => handleSectionChange("CerrarSesion")} className="logout">
            Cerrar Sesión
          </li>
        </ul>
      </div>

      <div className="adminContent">{renderContent()}</div>
    </div>
  );
}
