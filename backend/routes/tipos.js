const express = require('express');
const router = express.Router();
const Tipo = require('../models/Tipo');

// Obtener todos los tipos
router.get('/', async (req, res) => {
  try {
    const tipos = await Tipo.find();
    res.json(tipos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtener un tipo por ID
router.get('/:id', getTipo, (req, res) => {
  res.json(res.tipo);
});

// Crear un nuevo tipo
router.post('/', async (req, res) => {
  const tipo = new Tipo(req.body);
  try {
    const nuevoTipo = await tipo.save();
    res.status(201).json(nuevoTipo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Actualizar un tipo
router.patch('/:id', getTipo, async (req, res) => {
  if (req.body.nombre != null) {
    res.tipo.nombre = req.body.nombre;
  }
  // ... actualizar otros campos ...
  try {
    const tipoActualizado = await res.tipo.save();
    res.json(tipoActualizado);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Eliminar un tipo
router.delete('/:id', getTipo, async (req, res) => {
  try {
    await res.tipo.remove();
    res.json({ message: 'Tipo eliminado' });
  } catch (err) {
    console.error("Error al eliminar el tipo:", err); // Registra el error completo en la consola
    res.status(500).json({ message: err.message }); 
  }
});

// Middleware para obtener un tipo por ID
async function getTipo(req, res, next) {
  let tipo;
  try {
    tipo = await Tipo.findById(req.params.id);
    if (tipo === null) {
      return res.status(404).json({ message: 'Tipo no encontrado' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.tipo = tipo;
  next();
}

module.exports = router;