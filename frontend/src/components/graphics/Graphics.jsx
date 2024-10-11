import { useState } from 'react';
//import './ManageAdmin.css';

export default function ManageCourses() {
  const [courses, setCourses] = useState([]);

  const handleAddCourse = (e) => {
    e.preventDefault();
    const newCourse = {
      name: e.target.name.value,
      description: e.target.description.value,
      image: e.target.image.files[0]
    };
    setCourses([...courses, newCourse]);
    e.target.reset(); 
  };
  const handleEditCourse = (index) => {
    alert(`Editar admin: ${courses[index].name}`);
  };

  return (
    <div className="manage-admin-container">
      <form className="manage-admin-form" onSubmit={handleAddCourse}>
        <h2>Gestión de Administradores</h2>
        <label>Nombre:</label>
        <input type="text" name="name" required />
        <label>Apellido:</label>
        <input type="text" name="apellido" required />
        <label>Correo:</label>
        <input type="email" name="correo" required />
        <label>Descripción:</label>
        <textarea name="description" rows="4" required></textarea>

        <label>Subir Imagen del Administrador:</label>
        <input type="file" name="image" accept="image/*" required />

        <button type="submit">Agregar Admin</button>
      </form>

      <div className="admin-created">
        <h3>Administradores</h3>
        {courses.length === 0 ? (
          <p className="no-admin">No hay Admin creados.</p>
        ) : (
          <ul>
            {courses.map((course, index) => (
              <li key={index} className="admin-item">
                <img
                  src={URL.createObjectURL(course.image)}
                  alt={course.name}
                  className="admin-image"
                />
                <div className="admin-info">
                  <h4>{course.name}</h4>
                  <p>{course.description}</p>
                  <button onClick={() => handleEditCourse(index)} className="edit-btn">Editar Curso</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
