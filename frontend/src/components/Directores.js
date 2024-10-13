import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Directores() {
  const [directores, setDirectores] = useState([]);
  const [nombre, setNombre] = useState("");
  const [estado, setEstado] = useState("Activo");
  const [idDirectorEditar, setIdDirectorEditar] = useState(null);

  useEffect(() => {
    obtenerDirectores();
  }, []);

  const obtenerDirectores = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/directores`);
      setDirectores(response.data);
    } catch (error) {
      console.error("Error al obtener los directores:", error);
      Swal.fire("Error", "Error al obtener los directores", "error");
    }
  };

  const agregarDirector = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/directores`, { nombre, estado });
      setNombre("");
      setEstado("Activo");
      obtenerDirectores();
      Swal.fire("Éxito", "Director agregado correctamente", "success");
    } catch (error) {
      console.error("Error al agregar el director:", error);
      Swal.fire("Error", "Error al agregar el director", "error");
    }
  };

  const eliminarDirector = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/directores/${id}`);
      obtenerDirectores();
      Swal.fire("Éxito", "Director eliminado correctamente", "success");
    } catch (error) {
      console.error("Error al eliminar el director:", error);
      Swal.fire("Error", "Error al eliminar el director", "error");
    }
  };

  const editarDirector = (director) => {
    setIdDirectorEditar(director._id);
    setNombre(director.nombre);
    setEstado(director.estado);
  };

  const actualizarDirector = async () => {
    try {
      await axios.patch(`${process.env.REACT_APP_API_URL}/directores/${idDirectorEditar}`, { nombre, estado });
      setIdDirectorEditar(null);
      setNombre("");
      setEstado("Activo");
      obtenerDirectores();
      Swal.fire("Éxito", "Director actualizado correctamente", "success");
    } catch (error) {
      console.error("Error al actualizar el director:", error);
      Swal.fire("Error", "Error al actualizar el director", "error");
    }
  };

  const cancelarEdicion = () => {
    setIdDirectorEditar(null);
    setNombre("");
    setEstado("Activo");
  };

  return (
    <div className="container mt-5">
      <h1>Directores</h1>
      <div className="row mb-3">
        <div className="col-md-5">
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
          {idDirectorEditar ? (
            <>
              <button className="btn btn-success" onClick={actualizarDirector}>
                Guardar
              </button>
              <button className="btn btn-secondary ms-2" onClick={cancelarEdicion}>
                Cancelar
              </button>
            </>
          ) : (
            <button className="btn btn-primary" onClick={agregarDirector}>
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
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {directores.map((director) => (
            <tr key={director._id}>
              <td>{director.nombre}</td>
              <td>{director.estado}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => editarDirector(director)}>
                  Editar
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => eliminarDirector(director._id)}>
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

export default Directores;