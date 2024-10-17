import React, { useState } from 'react';
import './ManageScholarships.css';

export default function ManageScholarships() {
  const [showAddForm, setShowAddForm] = useState(false); // Para mostrar u ocultar el formulario
  const [becados, setBecados] = useState([]); // Para almacenar la lista de becados

  const handleAddScholarship = () => {
    setShowAddForm(!showAddForm); // Alterna el estado para mostrar o no el formulario
  };

  const handleAddBecado = (e) => {
    e.preventDefault();
    const newBecado = {
      nombres: e.target.nombres.value,
      apellidos: e.target.apellidos.value,
      edad: e.target.edad.value,
      ponderado: e.target.ponderado.value,
      boleta: e.target.boleta.files[0],
    };
    setBecados([...becados, newBecado]);
    setShowAddForm(false); // Ocultar formulario después de agregar el becado
  };

  const handleDeleteBecado = (index) => {
    const newBecados = [...becados];
    newBecados.splice(index, 1);
    setBecados(newBecados);
  };

  return (
    <div className="scholarship-management">
      <div className="scholarship-list">
        <h2>Gestión de Becas</h2><br />
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
            <tr>
              <td>Postulante 1</td>
              <td>applicant1@example.com</td>
              <td>Pendiente</td>
              <td>
                <button className='yes'>Aprobar</button><br /><br />
                <button className='no'>Rechazar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="add-scholarship">
        <button className="add-scholarship-btn" onClick={handleAddScholarship}>
          {showAddForm ? "Cerrar Formulario" : "Agregar Becado"}
        </button>

        {showAddForm && (
          <form className="scholarship-form" onSubmit={handleAddBecado}>
            <h3>Agregar Becado</h3>
            <div className="form-group">
              <label>Nombres:</label>
              <input type="text" name="nombres" required />
            </div>
            <div className="form-group">
              <label>Apellidos:</label>
              <input type="text" name="apellidos" required />
            </div>
            <div className="form-group">
              <label>Edad:</label>
              <input type="number" name="edad" required />
            </div>
            <div className="form-group">
              <label>Ponderado:</label>
              <input type="number" name="ponderado" step="0.01" required />
            </div>
            <div className="form-group">
              <label>Subir Boleta de Notas:</label>
              <input type="file" name="boleta" accept="application/pdf" required />
            </div>
            <button type="submit" className="submit-btn">Guardar</button>
          </form>
        )}

        {/* Mostrar la lista de becados aprobados */}
        <div className="becados-list">
          <h3>Lista de Becados</h3>
          <ul>
            {becados.map((becado, index) => (
              <li key={index}>
                {becado.nombres} {becado.apellidos} - Edad: {becado.edad} - Ponderado: {becado.ponderado}
                <button onClick={() => handleDeleteBecado(index)}>Eliminar</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
