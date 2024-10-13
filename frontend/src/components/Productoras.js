import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Productoras() {
  const [productoras, setProductoras] = useState([]);
  const [nombre, setNombre] = useState("");
  const [estado, setEstado] = useState("Activo");
  const [slogan, setSlogan] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [idProductoraEditar, setIdProductoraEditar] = useState(null);

  useEffect(() => {
    obtenerProductoras();
  }, []);

  const obtenerProductoras = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/productoras`);
      setProductoras(response.data);
    } catch (error) {
      console.error("Error al obtener las productoras:", error);
      Swal.fire("Error", "Error al obtener las productoras", "error");
    }
  };

  const agregarProductora = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/productoras`, {
        nombre,
        estado,
        slogan,
        descripcion,
      });
      setNombre("");
      setEstado("Activo");
      setSlogan("");
      setDescripcion("");
      obtenerProductoras();
      Swal.fire("Éxito", "Productora agregada correctamente", "success");
    } catch (error) {
      console.error("Error al agregar la productora:", error);
      Swal.fire("Error", "Error al agregar la productora", "error");
    }
  };

  const eliminarProductora = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/productoras/${id}`);
      obtenerProductoras();
      Swal.fire("Éxito", "Productora eliminada correctamente", "success");
    } catch (error) {
      console.error("Error al eliminar la productora:", error);
      Swal.fire("Error", "Error al eliminar la productora", "error");
    }
  };

  const editarProductora = (productora) => {
    setIdProductoraEditar(productora._id);
    setNombre(productora.nombre);
    setEstado(productora.estado);
    setSlogan(productora.slogan);
    setDescripcion(productora.descripcion);
  };

  const actualizarProductora = async () => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_API_URL}/productoras/${idProductoraEditar}`,
        { nombre, estado, slogan, descripcion }
      );
      setIdProductoraEditar(null);
      setNombre("");
      setEstado("Activo");
      setSlogan("");
      setDescripcion("");
      obtenerProductoras();
      Swal.fire("Éxito", "Productora actualizada correctamente", "success");
    } catch (error) {
      console.error("Error al actualizar la productora:", error);
      Swal.fire("Error", "Error al actualizar la productora", "error");
    }
  };

  const cancelarEdicion = () => {
    setIdProductoraEditar(null);
    setNombre("");
    setEstado("Activo");
    setSlogan("");
    setDescripcion("");
  };

  return (
    <div className="container mt-5">
      <h1>Productoras</h1>
      {/* Formulario para agregar o editar productora */}
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
            placeholder="Slogan"
            value={slogan}
            onChange={(e) => setSlogan(e.target.value)}
          />
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
          {idProductoraEditar ? (
            <>
              <button className="btn btn-success" onClick={actualizarProductora}>
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
            <button className="btn btn-primary" onClick={agregarProductora}>
              Agregar
            </button>
          )}
        </div>
      </div>

      {/* Tabla para mostrar las productoras */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Slogan</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productoras.map((productora) => (
            <tr key={productora._id}>
              <td>{productora.nombre}</td>
              <td>{productora.estado}</td>
              <td>{productora.slogan}</td>
              <td>{productora.descripcion}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => editarProductora(productora)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => eliminarProductora(productora._id)}
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

export default Productoras;