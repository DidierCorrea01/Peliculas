const express = require('express');
const router = express.Router();
const Director = require('../models/Director');

// Obtener todos los directores
router.get('/', async (req, res) => {
  try {
    const directores = await Director.find();
    res.json(directores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtener un director por ID
router.get('/:id', getDirector, (req, res) => {
  res.json(res.director);
});

// Crear un nuevo director
router.post('/', async (req, res) => {
  const director = new Director(req.body);
  try {
    const nuevoDirector = await director.save();
    res.status(201).json(nuevoDirector);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Actualizar un director
router.patch('/:id', getDirector, async (req, res) => {
  if (req.body.nombre != null) {
    res.director.nombre = req.body.nombre;
  }
  // ... actualizar otros campos ...
  try {
    const directorActualizado = await res.director.save();
    res.json(directorActualizado);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Eliminar un director
router.delete('/:id', getDirector, async (req, res) => {
  try {
    await res.director.remove();
    res.json({ message: 'Director eliminado' });
  } catch (err) {
    console.error("Error al eliminar el director:", err); // Registra el error completo en la consola
    res.status(500).json({ message: err.message }); 
  }
});

// Middleware para obtener un director por ID
async function getDirector(req, res, next) {
  let director;
  try {
    director = await Director.findById(req.params.id);
    if (director === null) {
      return res.status(404).json({ message: 'Director no encontrado' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.director = director;
  next();
}

module.exports = router;