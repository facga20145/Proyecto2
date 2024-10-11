import React, { useState } from "react";
import "./Admin.css";
import logo from "../images/logo.png";
import ManageUsers from "../manageUsers/ManageUsers";
import ManageScholarships from "../becas/ManageScholarships";
import ManageCourses from "../CrearCurso/ManageCourses";
import ManageAdmin from "../manageAdmin/ManageAdmin";
import ManageTeacher from "../manageTeacher/ManageTeacher";
import Graphics from "../graphics/Graphics";

export default function Admin() {
  // Estado para controlar qué sección está activa
  const [activeSection, setActiveSection] = useState("dashboard");

  // Función para cambiar la sección activa
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  // Diferentes secciones de contenido
  const renderContent = () => {
    switch (activeSection) {
      case "Usuarios":
        return (
          <div>
            <ManageUsers />
          </div>
        );
      case "Becas":
        return (
          <div>
            <ManageScholarships />
          </div>
        );
      case "Graficos":
        return (
          <div>
            <Graphics />
          </div>
        );
      case "GestionDocentes":
        return (
          <div>
            <ManageTeacher />
          </div>
          );  
      case "CrearCursos":
        return (
          <div>
            <ManageCourses />
          </div>
        );
      case "CrearAdministradores":
        return (
          <div>
            <ManageAdmin />
          </div>
        );
      case "ExtraInfo":
        return <p>Nueva Informacion en progreso</p>;
      default:
        return <p>Selecciona una opción</p>;
    }
  };

  return (
    <div className="adminPanelContainerKids">
      {/* Primera columna: Opciones */}
      <div className="adminSidebarKids">
        <img src={logo} alt="Admin" className="adminImageKids" />
        <ul>
          <li
            onClick={() => handleSectionChange("Usuarios")}
            className={activeSection === "Usuarios" ? "activeKids" : ""}
          >
            Usuarios
          </li>
          <li
            onClick={() => handleSectionChange("Becas")}
            className={activeSection === "Becas" ? "activeKids" : ""}
          >
            Becas
          </li>
          <li
            onClick={() => handleSectionChange("Graficos")}
            className={activeSection === "Graficos" ? "activeKids" : ""}
          >
            Graficos
          </li>
          <li
            onClick={() => handleSectionChange("BecasRegistradas")}
            className={activeSection === "BecasRegistradas" ? "activeKids" : ""}
          >
            Becas Registradas
          </li>
          <li
            onClick={() => handleSectionChange("GestionDocentes")}
            className={activeSection === "GestionDocentes" ? "activeKids" : ""}
          >
            Gestión de Docentes
          </li>
          <li
            onClick={() => handleSectionChange("CrearCursos")}
            className={activeSection === "CrearCursos" ? "activeKids" : ""}
          >
            Crear Cursos
          </li>
          <li
            onClick={() => handleSectionChange("CrearAdministradores")}
            className={
              activeSection === "CrearAdministradores" ? "activeKids" : ""
            }
          >
            Crear Administradores
          </li>
          <li
            onClick={() => handleSectionChange("ExtraInfo")}
            className={activeSection === "ExtraInfo" ? "activeKids" : ""}
          >
            Extra Info
          </li>
        </ul>
      </div>
      <div className="adminContentKids">{renderContent()}</div>
    </div>
  );
}
