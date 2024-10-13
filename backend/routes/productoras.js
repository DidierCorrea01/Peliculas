const express = require('express');
const router = express.Router();
const Productora = require('../models/Productora');

// Obtener todas las productoras
router.get('/', async (req, res) => {
  try {
    const productoras = await Productora.find();
    res.json(productoras);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtener una productora por ID
router.get('/:id', getProductora, (req, res) => {
  res.json(res.productora);
});

// Crear una nueva productora
router.post('/', async (req, res) => {
  const productora = new Productora(req.body);
  try {
    const nuevaProductora = await productora.save();
    res.status(201).json(nuevaProductora);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Actualizar una productora
router.patch('/:id', getProductora, async (req, res) => {
  if (req.body.nombre != null) {
    res.productora.nombre = req.body.nombre;
  }
  // ... actualizar otros campos ...
  try {
    const productoraActualizada = await res.productora.save();
    res.json(productoraActualizada);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Eliminar una productora
router.delete('/:id', getProductora, async (req, res) => {
  try {
    await res.productora.remove();
    res.json({ message: 'Productora eliminada' });
  } catch (err) {
    console.error("Error al eliminar la productora:", err); // Registra el error completo en la consola
    res.status(500).json({ message: err.message }); 
  }
});

// Middleware para obtener una productora por ID
async function getProductora(req, res, next) {
  let productora;
  try {
    productora = await Productora.findById(req.params.id);
    if (productora === null) {
      return res.status(404).json({ message: 'Productora no encontrada' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.productora = productora;
  next();
}

module.exports = router;