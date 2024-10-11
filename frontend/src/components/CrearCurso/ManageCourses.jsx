import { useState } from 'react';
import './ManageCourses.css';

export default function ManageCourses() {
  const [courses, setCourses] = useState([]);

  const handleAddCourse = (e) => {
    e.preventDefault();
    const newCourse = {
      name: e.target.name.value,
      description: e.target.description.value,
      category: e.target.category.value,
      teacher: e.target.teacher.value,
      ageGroup: e.target.ageGroup.value,
      price: e.target.price.value,
      videoLink: e.target.videoLink.value,
    };
    setCourses([...courses, newCourse]);
    e.target.reset();
  };

  const handleEditCourse = (index) => {
    alert(`Editar curso: ${courses[index].name}`);
  };

  return (
    <div className="manage-courses-container">
      <form className="manage-courses-form" onSubmit={handleAddCourse}>
        <h2>Gestión de Cursos</h2>

        <label>Nombre del Curso:</label>
        <input type="text" name="name" required />

        <label>Descripción:</label>
        <textarea name="description" rows="4" required></textarea>

        <label>Categoría:</label>
        <select name="category" required>
          <option value="Tecnología">Tecnología</option>
          <option value="Matemáticas">Matemáticas</option>
          <option value="Idiomas">Idiomas</option>
        </select>

        <label>Docente:</label>
        <select name="teacher" required>
          <option value="Juan Pérez">Juan Pérez</option>
          <option value="María Gómez">María Gómez</option>
        </select>

        <label>Edad del Curso:</label>
        <select name="ageGroup" required>
          <option value="Niños">Niños</option>
          <option value="Adolescentes">Adolescentes</option>
          <option value="Adultos">Adultos</option>
        </select>

        <label>Precio:</label>
        <input type="number" name="price" required />

        <label>Enlace del Video (YouTube):</label>
        <input type="url" name="videoLink" required />

        <button type="submit">Agregar Curso</button>
      </form>

      <div className="courses-created">
        <h3>Cursos Creados</h3>
        {courses.length === 0 ? (
          <p className="no-courses">No hay cursos creados.</p>
        ) : (
          <ul>
            {courses.map((course, index) => (
              <li key={index} className="course-item">
                <div className="course-info">
                  <h4>{course.name}</h4>
                  <p>{course.description}</p>
                  <p>Categoría: {course.category}</p>
                  <p>Docente: {course.teacher}</p>
                  <p>Edad: {course.ageGroup}</p>
                  <p>Precio: ${course.price}</p>
                  <p>Video: <a href={course.videoLink}>Ver video</a></p>
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
