const mongoose = require('mongoose');

const generoSchema = new mongoose.Schema({
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
  descripcion: {
    type: String,
  },
});

module.exports = mongoose.model('Genero', generoSchema);