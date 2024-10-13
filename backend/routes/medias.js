const express = require('express');
const router = express.Router();
const Media = require('../models/Media');
const multer = require('multer');
const path = require('path'); 

// Configuración de Multer para guardar las imágenes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Obtener todas las medias
router.get('/', async (req, res) => {
  try {
    const medias = await Media.find();
    res.json(medias);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtener una media por ID
router.get('/:id', getMedia, (req, res) => {
  res.json(res.media);
});

// Crear una nueva media (modificada para usar Multer)
router.post('/', upload.single('imagen'), async (req, res) => {
  // req.file contiene la información de la imagen subida
  const media = new Media({
    titulo: req.body.titulo,
    genero_id: req.body.genero_id,
    director_id: req.body.director_id,
    productora_id: req.body.productora_id,
    tipo_id: req.body.tipo_id,
    sinopsis: req.body.sinopsis,
    fecha_lanzamiento: req.body.fecha_lanzamiento,
    url: req.body.url,
    imagen: req.file.filename, // Guarda el nombre del archivo de la imagen
    anio_estreno: req.body.anio_estreno
  });

  try {
    const nuevaMedia = await media.save();
    res.status(201).json(nuevaMedia);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Actualizar una media
router.patch('/:id', getMedia, async (req, res) => {
  if (req.body.titulo != null) {
    res.media.titulo = req.body.titulo;
  }
  // ... actualizar otros campos ...

  try {
    const mediaActualizada = await res.media.save();
    res.json(mediaActualizada);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Eliminar una media
router.delete("/:id", getMedia, async (req, res) => {
  try {
    await res.media.remove();
    res.json({ message: "Media eliminada" });
  } catch (err) {
    console.error("Error al eliminar la media:", err); // Registra el error completo en la consola
    res.status(500).json({ message: err.message }); 
  }
});

// Middleware para obtener una media por ID
async function getMedia(req, res, next) {
  let media;
  try {
    media = await Media.findById(req.params.id);
    if (media === null) {
      return res.status(404).json({ message: 'Media no encontrada' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.media = media;
  next();
}

module.exports = router;