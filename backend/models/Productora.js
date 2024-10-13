const mongoose = require('mongoose');

const productoraSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  estado: {
    type: String,
    enum: ['Activo', 'Inactivo'],
    default: 'Activo',
  },
  fecha_creacion: {
    type: Date,
    default: Date.now,
  },
  fecha_actualizacion: {
    type: Date,
    default: Date.now,
  },
  slogan: {
    type: String,
  },
  descripcion: {
    type: String,
  },
});

module.exports = mongoose.model('Productora', productoraSchema);