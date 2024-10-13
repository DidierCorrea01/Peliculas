const mongoose = require('mongoose');

const tipoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
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

module.exports = mongoose.model('Tipo', tipoSchema);