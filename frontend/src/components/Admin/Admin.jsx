import React, { useState } from "react";
import "./Admin.css";
import logo from "../images/Logo-White.svg";
import ManageUsers from "../manageUsers/ManageUsers";
import ManageScholarships from "../becas/ManageScholarships";
import ManageCourses from "../CrearCurso/ManageCourses";
import ManageAdmin from "../manageAdmin/ManageAdmin";
import ManageTeacher from "../manageTeacher/ManageTeacher";
import Graphics from "../graphics/Graphics";
import ManageSesion from "../becas/ManageScholarships";

export default function Admin() {
  // Estado para controlar qué sección está activa
  const [activeSection, setActiveSection] = useState("dashboard");

  // Estado para controlar si el menú hamburguesa está abierto
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Función para cambiar la sección activa
  const handleSectionChange = (section) => {
    setActiveSection(section);
    setIsSidebarOpen(false); // Cerrar el menú hamburguesa al seleccionar una opción
  };

  // Alternar el estado del menú hamburguesa
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Diferentes secciones de contenido
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
      case "CerrarSesion":
        return <ManageSesion />;
      default:
        return <p>Selecciona una opción</p>;
    }
  };

  return (
    <div className="adminPanelContainer">
      {/* Botón de menú hamburguesa */}
      <button className="hamburger" onClick={toggleSidebar}>
        ☰
      </button>

      {/* Primera columna: Opciones */}
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
          <li onClick={() => handleSectionChange("BecasRegistradas")} className={activeSection === "BecasRegistradas" ? "active" : ""}>
            Becas Registradas
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
          <li onClick={() => handleSectionChange("CerrarSesion")} className={activeSection === "CerrarSesion" ? "active" : ""}>
            Cerrar Sesion
          </li>
        </ul>
      </div>

      {/* Contenido principal */}
      <div className="adminContent">{renderContent()}</div>
    </div>
  );
}
