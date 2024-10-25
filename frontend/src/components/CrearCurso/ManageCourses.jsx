import { useState } from 'react';
import './ManageCourses.css';

export default function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Número de cursos por página

  // Simulamos la lista de docentes
  const [teachers] = useState([
    { id: 1, name: "Juan Pérez" },
    { id: 2, name: "María Gómez" },
    { id: 3, name: "Carlos Sánchez" }
  ]);
  const handleAddCourse = (e) => {
    e.preventDefault();
    const newCourse = {
      name: e.target.name.value,
      description: e.target.description.value,
      category: e.target.category.value,
      teacher: e.target.teacher.value,
      age: e.target.age.value,
      price: e.target.price.value,
      videoLink: e.target.videoLink.value
    };
    setCourses([...courses, newCourse]);
    e.target.reset();
  };

  const handleEditCourse = (index) => {
    alert(`Editar curso: ${courses[index].name}`);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Lógica para paginar los cursos
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCourses = courses.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(courses.length / itemsPerPage);

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
          <option value="Idiomas">Idiomas</option>
          <option value="Matemáticas">Matemáticas</option>
        </select>

        <label>Docente:</label>
        <select name="teacher" required>
          {teachers.map((teacher) => (
            <option key={teacher.id} value={teacher.name}>
              {teacher.name}
            </option>
          ))}
        </select>

        <label>Edad del Curso:</label>
        <select name="age" required>
          <option value="Niños">Niños</option>
          <option value="Adolescentes">Adolescentes</option>
          <option value="Adultos">Adultos</option>
        </select>

        <label>Precio:</label>
        <input type="number" name="price" required />

        <label>Duración:</label>
        <input type="text" name="duration" required />

        <label>Enlace del Video (YouTube):</label>
        <input type="text" name="videoLink" required />

        <button type="submit">Agregar Curso</button>
      </form>

      <div className="courses-created">
        <h3 className='titulo'>Cursos Creados</h3>
        {courses.length === 0 ? (
          <p className="no-courses">No hay cursos creados.</p>
        ) : (
          <>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th>Docente</th>
                  <th>Edad</th>
                  <th>Precio</th>
                  <th>Video</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {currentCourses.map((course, index) => (
                  <tr key={index}>
                    <td>{indexOfFirstItem + index + 1}</td>
                    <td>{course.name}</td>
                    <td>{course.category}</td>
                    <td>{course.teacher}</td>
                    <td>{course.age}</td>
                    <td>${course.price}</td>
                    <td>
                      <a href={course.videoLink} target="_blank" rel="noopener noreferrer">
                        Ver video
                      </a>
                    </td>
                    <td>
                      <button onClick={() => handleEditCourse(index)} className="edit-btn">
                        Editar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Controles de paginación */}
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
          </>
        )}
      </div>
    </div>
  );
}
