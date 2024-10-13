const express = require('express');
const router = express.Router();
const Genero = require('../models/Genero');

// Obtener todos los géneros
router.get('/', async (req, res) => {
  try {
    const generos = await Genero.find();
    res.json(generos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtener un género por ID
router.get('/:id', getGenero, (req, res) => {
  res.json(res.genero);
});

// Crear un nuevo género
router.post('/', async (req, res) => {
  const genero = new Genero(req.body);
  try {
    const nuevoGenero = await genero.save();
    res.status(201).json(nuevoGenero);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Actualizar un género
router.patch('/:id', getGenero, async (req, res) => {
  if (req.body.nombre != null) {
    res.genero.nombre = req.body.nombre;
  }
  // ... actualizar otros campos ...
  try {
    const generoActualizado = await res.genero.save();
    res.json(generoActualizado);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Eliminar un género
router.delete('/:id', getGenero, async (req, res) => {
  try {
    await res.genero.remove();
    res.json({ message: 'Género eliminado' });
  } catch (err) {
    console.error("Error al eliminar el género:", err);
    res.status(500).json({ message: err.message }); 
  }
});

// Middleware para obtener un género por ID
async function getGenero(req, res, next) {
  let genero;
  try {
    genero = await Genero.findById(req.params.id);
    if (genero === null) {
      return res.status(404).json({ message: 'Género no encontrado' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.genero = genero;
  next();
}

module.exports = router;