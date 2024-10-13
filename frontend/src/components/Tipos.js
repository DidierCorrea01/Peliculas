import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Tipos() {
  const [tipos, setTipos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [idTipoEditar, setIdTipoEditar] = useState(null);

  useEffect(() => {
    obtenerTipos();
  }, []);

  const obtenerTipos = async () => {
    try {
      const response = await axios.get("http://localhost:3001/tipos");
      setTipos(response.data);
    } catch (error) {
      console.error("Error al obtener los tipos:", error);
      Swal.fire("Error", "Error al obtener los tipos", "error");
    }
  };

  const agregarTipo = async () => {
    try {
      await axios.post("http://localhost:3001/tipos", {
        nombre,
        descripcion,
      });
      setNombre("");
      setDescripcion("");
      obtenerTipos();
      Swal.fire("Éxito", "Tipo agregado correctamente", "success");
    } catch (error) {
      console.error("Error al agregar el tipo:", error);
      Swal.fire("Error", "Error al agregar el tipo", "error");
    }
  };

  const eliminarTipo = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/tipos/${id}`);
      obtenerTipos();
      Swal.fire("Éxito", "Tipo eliminado correctamente", "success");
    } catch (error) {
      console.error("Error al eliminar el tipo:", error);
      Swal.fire("Error", "Error al eliminar el tipo", "error");
    }
  };

  const editarTipo = (tipo) => {
    setIdTipoEditar(tipo._id);
    setNombre(tipo.nombre);
    setDescripcion(tipo.descripcion);
  };

  const actualizarTipo = async () => {
    try {
      await axios.patch(`http://localhost:3001/tipos/${idTipoEditar}`, {
        nombre,
        descripcion,
      });
      setIdTipoEditar(null);
      setNombre("");
      setDescripcion("");
      obtenerTipos();
      Swal.fire("Éxito", "Tipo actualizado correctamente", "success");
    } catch (error) {
      console.error("Error al actualizar el tipo:", error);
      Swal.fire("Error", "Error al actualizar el tipo", "error");
    }
  };

  const cancelarEdicion = () => {
    setIdTipoEditar(null);
    setNombre("");
    setDescripcion("");
  };

  return (
    <div className="container mt-5">
      <h1>Tipos</h1>
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
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>
        <div className="col-md-1">
          {idTipoEditar ? (
            <>
              <button className="btn btn-success" onClick={actualizarTipo}>
                Guardar
              </button>
              <button
                className="btn btn-secondary ms-2"
                onClick={cancelarEdicion}
              >
                Cancelar
              </button>
            </>
          ) : (
            <button className="btn btn-primary" onClick={agregarTipo}>
              Agregar
            </button>
          )}
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tipos.map((tipo) => (
            <tr key={tipo._id}>
              <td>{tipo.nombre}</td>
              <td>{tipo.descripcion}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => editarTipo(tipo)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => eliminarTipo(tipo._id)}
                >
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

export default Tipos;