import { useState, useEffect } from 'react';
import './ManageCourses.css';

export default function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [categories, setCategories] = useState([]);
  const [docentes, setDocentes] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null); // Estado para la previsualización de la imagen

  // Función para obtener cursos activos desde el backend
  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/cursos');
      if (!response.ok) {
        throw new Error('Error al obtener cursos');
      }
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/categorias');
        if (!response.ok) {
          throw new Error('Error al obtener categorías');
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const fetchDocentes = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/docentes');
        if (!response.ok) {
          throw new Error('Error al obtener docentes');
        }
        const data = await response.json();
        setDocentes(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchCategories();
    fetchDocentes();
    fetchCourses();
  }, []);

  const handleAddCourse = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const response = await fetch('http://localhost:5000/api/curso', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Error al crear el curso');
      }

      const result = await response.json();
      console.log('Curso creado con éxito:', result);
      e.target.reset();
      setPreviewUrl(null); // Limpiar la previsualización de la imagen después de agregar el curso
      fetchCourses();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteCourse = async (idCurso) => {
    try {
      const response = await fetch(`http://localhost:5000/api/curso/${idCurso}`, {
        method: 'PUT'
      });
      if (!response.ok) {
        throw new Error('Error al eliminar el curso');
      }
      const result = await response.json();
      console.log(result.message);

      // Actualizar la lista de cursos después de eliminar (desactivar) uno
      setCourses(prevCourses => prevCourses.filter(c => c.idCurso !== idCurso));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCourses = courses.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(courses.length / itemsPerPage);

  return (
    <div className="manage-courses-container">
      <form className="manage-courses-form" onSubmit={handleAddCourse} encType="multipart/form-data">
  <h2>Gestión de Cursos</h2>

  <label>Nombre del Curso:</label>
  <input type="text" name="name" required />

  <label>Descripción:</label>
  <textarea name="descripcion" rows="4" required></textarea>

  <label>Categoría:</label>
  <select name="category" required>
    <option value="">Seleccione una categoría</option>
    {categories.map((cat) => (
      <option key={cat.idCategoria} value={cat.idCategoria}>
        {cat.NombreCategoria}
      </option>
    ))}
  </select>

  <label>Docente:</label>
  <select name="teacher" required>
    <option value="">Seleccione un docente</option>
    {docentes.map((doc) => (
      <option key={doc.idUsuario} value={doc.idUsuario}>
        {doc.Nombre}
      </option>
    ))}
  </select>

  <label>Clasificación por Edad:</label>
  <select name="ClasificacionEdad" required>
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

  <label>Imagen (PNG o JPG):</label>
  {previewUrl && (
    <img className="image-preview" src={previewUrl} alt="Preview" />
  )}
  <label className="custom-file-input">
  Seleccionar Imagen
  <input
    type="file"
    name="imagen"
    accept="image/png, image/jpeg"
    onChange={handleFileChange}
    required
  />
</label>


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
                  <th>Logo</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Opción
                    <button onClick={fetchCourses} className="refresh-button">
                      ↻
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentCourses.map((course, index) => (
                  <tr key={index}>
                    <td>{indexOfFirstItem + index + 1}</td>
                    <td>
                      <img
                        src={`http://localhost/Pagina_Cursos_online/${course.imagen}`}
                        alt={course.nombre_curso}
                        style={{ width: '50px', height: '50px' }}
                      />
                    </td>
                    <td>{course.nombre_curso}</td>
                    <td>S/ {course.precio}</td>
                    <td>
                      <button
                        onClick={() => handleDeleteCourse(course.idCurso)}
                        style={{ backgroundColor: 'red', color: 'white' }}
                      >
                        X
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
          </>
        )}
      </div>
    </div>
  );
}
