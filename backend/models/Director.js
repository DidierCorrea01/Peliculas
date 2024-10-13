const mongoose = require('mongoose');

const directorSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model('Director', directorSchema);