import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Generos() {
  const [generos, setGeneros] = useState([]);
  const [nombre, setNombre] = useState("");
  const [estado, setEstado] = useState("Activo");
  const [descripcion, setDescripcion] = useState("");
  const [idGeneroEditar, setIdGeneroEditar] = useState(null);

  useEffect(() => {
    obtenerGeneros();
  }, []);

  const obtenerGeneros = async () => {
    try {
      const response = await axios.get("http://localhost:3001/generos"); // URL original
      setGeneros(response.data);
    } catch (error) {
      console.error("Error al obtener los géneros:", error);
      Swal.fire("Error", "Error al obtener los géneros", "error");
    }
  };

  const agregarGenero = async () => {
    try {
      await axios.post("http://localhost:3001/generos", { nombre, estado, descripcion });
      setNombre("");
      setEstado("Activo");
      setDescripcion("");
      obtenerGeneros();
      Swal.fire("Éxito", "Género agregado correctamente", "success");
    } catch (error) {
      console.error("Error al agregar el género:", error);
      Swal.fire("Error", "Error al agregar el género", "error");
    }
  };

  const eliminarGenero = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/generos/${id}`);
      obtenerGeneros();
      Swal.fire("Éxito", "Género eliminado correctamente", "success");
    } catch (error) {
      console.error("Error al eliminar el género:", error);
      Swal.fire("Error", "Error al eliminar el género", "error");
    }
  };

  const editarGenero = (genero) => {
    setIdGeneroEditar(genero._id);
    setNombre(genero.nombre);
    setEstado(genero.estado);
    setDescripcion(genero.descripcion);
  };

  const actualizarGenero = async () => {
    try {
      await axios.patch(`http://localhost:3001/generos/${idGeneroEditar}`, { nombre, estado, descripcion });
      setIdGeneroEditar(null);
      setNombre("");
      setEstado("Activo");
      setDescripcion("");
      obtenerGeneros();
      Swal.fire("Éxito", "Género actualizado correctamente", "success");
    } catch (error) {
      console.error("Error al actualizar el género:", error);
      Swal.fire("Error", "Error al actualizar el género", "error");
    }
  };

  const cancelarEdicion = () => {
    setIdGeneroEditar(null);
    setNombre("");
    setEstado("Activo");
    setDescripcion("");
  };

  return (
    <div className="container mt-5">
      <h1>Géneros</h1>
      <div className="row mb-3">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          >
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>
        <div className="col-md-1">
          {idGeneroEditar ? (
            <>
              <button className="btn btn-success" onClick={actualizarGenero}>
                Guardar
              </button>
              <button className="btn btn-secondary ms-2" onClick={cancelarEdicion}>
                Cancelar
              </button>
            </>
          ) : (
            <button className="btn btn-primary" onClick={agregarGenero}>
              Agregar
            </button>
          )}
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {generos.map((genero) => (
            <tr key={genero._id}>
              <td>{genero.nombre}</td>
              <td>{genero.estado}</td>
              <td>{genero.descripcion}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => editarGenero(genero)}>
                  Editar
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => eliminarGenero(genero._id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Generos;