import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Medias() {
  const [medias, setMedias] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [directores, setDirectores] = useState([]);
  const [productoras, setProductoras] = useState([]);
  const [tipos, setTipos] = useState([]);

  const [titulo, setTitulo] = useState("");
  const [genero_id, setGeneroId] = useState("");
  const [director_id, setDirectorId] = useState("");
  const [productora_id, setProductoraId] = useState("");
  const [tipo_id, setTipoId] = useState("");
  const [sinopsis, setSinopsis] = useState("");
  const [fecha_lanzamiento, setFechaLanzamiento] = useState("");
  const [url, setUrl] = useState("");
  const [imagen, setImagen] = useState(null); // Inicializa imagen como null
  const [anio_estreno, setAnioEstreno] = useState("");

  const [idMediaEditar, setIdMediaEditar] = useState(null);

  useEffect(() => {
    obtenerMedias();
    obtenerGeneros();
    obtenerDirectores();
    obtenerProductoras();
    obtenerTipos();
  }, []);

  const obtenerMedias = async () => {
    try {
      const response = await axios.get("http://localhost:3001/medias");
      setMedias(response.data);
    } catch (error) {
      console.error("Error al obtener las medias:", error);
      Swal.fire("Error", "Error al obtener las medias", "error");
    }
  };

  const obtenerGeneros = async () => {
    try {
      const response = await axios.get("http://localhost:3001/generos");
      setGeneros(response.data);
    } catch (error) {
      console.error("Error al obtener los géneros:", error);
    }
  };

  const obtenerDirectores = async () => {
    try {
      const response = await axios.get("http://localhost:3001/directores");
      setDirectores(response.data);
    } catch (error) {
      console.error("Error al obtener los directores:", error);
    }
  };

  const obtenerProductoras = async () => {
    try {
      const response = await axios.get("http://localhost:3001/productoras");
      setProductoras(response.data);
    } catch (error) {
      console.error("Error al obtener las productoras:", error);
    }
  };

  const obtenerTipos = async () => {
    try {
      const response = await axios.get("http://localhost:3001/tipos");
      setTipos(response.data);
    } catch (error) {
      console.error("Error al obtener los tipos:", error);
    }
  };

  const handleImageChange = (e) => {
    setImagen(e.target.files[0]);
  };

  const agregarMedia = async () => {
    try {
      const formData = new FormData();
      formData.append("titulo", titulo);
      formData.append("genero_id", genero_id);
      formData.append("director_id", director_id);
      formData.append("productora_id", productora_id);
      formData.append("tipo_id", tipo_id);
      formData.append("sinopsis", sinopsis);
      formData.append("fecha_lanzamiento", fecha_lanzamiento);
      formData.append("url", url);
      formData.append("imagen", imagen); // Agrega la imagen al FormData
      formData.append("anio_estreno", anio_estreno);

      await axios.post("http://localhost:3001/medias", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Configura la cabecera para la subida de archivos
        },
      });

      limpiarCampos();
      obtenerMedias();
      Swal.fire("Éxito", "Media agregada correctamente", "success");
    } catch (error) {
      console.error("Error al agregar la media:", error);
      Swal.fire("Error", "Error al agregar la media", "error");
    }
  };

  const eliminarMedia = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/medias/${id}`);
      obtenerMedias();
      Swal.fire("Éxito", "Media eliminada correctamente", "success");
    } catch (error) {
      console.error("Error al eliminar la media:", error);
      Swal.fire("Error", "Error al eliminar la media", "error");
    }
  };

  const editarMedia = (media) => {
    setIdMediaEditar(media._id);
    setTitulo(media.titulo);
    setGeneroId(media.genero_id);
    setDirectorId(media.director_id);
    setProductoraId(media.productora_id);
    setTipoId(media.tipo_id);
    setSinopsis(media.sinopsis);
    setFechaLanzamiento(media.fecha_lanzamiento);
    setUrl(media.url);
    setImagen(media.imagen); // Asegúrate de que la imagen se actualice en el estado
    setAnioEstreno(media.anio_estreno);
  };

  const actualizarMedia = async () => {
    try {
      await axios.patch(`http://localhost:3001/medias/${idMediaEditar}`, {
        titulo,
        genero_id,
        director_id,
        productora_id,
        tipo_id,
        sinopsis,
        fecha_lanzamiento,
        url,
        // imagen, // No se actualiza la imagen en este ejemplo
        anio_estreno,
      });
      limpiarCampos();
      obtenerMedias();
      Swal.fire("Éxito", "Media actualizada correctamente", "success");
    } catch (error) {
      console.error("Error al actualizar la media:", error);
      Swal.fire("Error", "Error al actualizar la media", "error");
    }
  };

  const cancelarEdicion = () => {
    limpiarCampos();
  };

  const limpiarCampos = () => {
    setIdMediaEditar(null);
    setTitulo("");
    setGeneroId("");
    setDirectorId("");
    setProductoraId("");
    setTipoId("");
    setSinopsis("");
    setFechaLanzamiento("");
    setUrl("");
    setImagen(null); // Reinicia la imagen a null
    setAnioEstreno("");
  };

  return (
    <div className="container mt-5">
      <h1>Medias</h1>
      <div className="row mb-3">
        {/* Campos del formulario */}
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={genero_id}
            onChange={(e) => setGeneroId(e.target.value)}
          >
            <option value="">Selecciona un género</option>
            {generos.map((genero) => (
              <option key={genero._id} value={genero._id}>
                {genero.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={director_id}
            onChange={(e) => setDirectorId(e.target.value)}
          >
            <option value="">Selecciona un director</option>
            {directores.map((director) => (
              <option key={director._id} value={director._id}>
                {director.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={productora_id}
            onChange={(e) => setProductoraId(e.target.value)}
          >
            <option value="">Selecciona una productora</option>
            {productoras.map((productora) => (
              <option key={productora._id} value={productora._id}>
                {productora.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={tipo_id}
            onChange={(e) => setTipoId(e.target.value)}
          >
            <option value="">Selecciona un tipo</option>
            {tipos.map((tipo) => (
              <option key={tipo._id} value={tipo._id}>
                {tipo.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <textarea
            className="form-control"
            placeholder="Sinopsis"
            value={sinopsis}
            onChange={(e) => setSinopsis(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <input
            type="date"
            className="form-control"
            placeholder="Fecha de lanzamiento"
            value={fecha_lanzamiento}
            onChange={(e) => setFechaLanzamiento(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <input
            type="file" // Input para la imagen
            className="form-control"
            onChange={(e) => handleImageChange(e)}
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            className="form-control"
            placeholder="Año de estreno"
            value={anio_estreno}
            onChange={(e) => setAnioEstreno(e.target.value)}
          />
        </div>
        {/* Botones de acción */}
        <div className="col-md-2">
          {idMediaEditar ? (
            <>
              <button className="btn btn-success" onClick={actualizarMedia}>
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
            <button className="btn btn-primary" onClick={agregarMedia}>
              Agregar
            </button>
          )}
        </div>
      </div>

      {/* Tabla para mostrar las medias */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Título</th>
            <th>Género</th>
            <th>Director</th>
            <th>Productora</th>
            <th>Tipo</th>
            <th>Sinopsis</th>
            <th>Fecha Lanzamiento</th>
            <th>URL</th>
            <th>Imagen</th>
            <th>Año Estreno</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {medias.map((media) => (
            <tr key={media._id}>
              <td>{media.titulo}</td>
              <td>
                {generos.find((genero) => genero._id === media.genero_id)?.nombre || "Género no encontrado"}
              </td>
              <td>
                {directores.find((director) => director._id === media.director_id)?.nombre || "Director no encontrado"}
              </td>
              <td>
                {productoras.find((productora) => productora._id === media.productora_id)?.nombre || "Productora no encontrada"}
              </td>
              <td>
                {tipos.find((tipo) => tipo._id === media.tipo_id)?.nombre || "Tipo no encontrado"}
              </td>
              <td>{media.sinopsis}</td>
              <td>{media.fecha_lanzamiento}</td>
              <td>{media.url}</td>
              <td>{media.imagen}</td>
              <td>{media.anio_estreno}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => editarMedia(media)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => eliminarMedia(media._id)}
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

export default Medias;