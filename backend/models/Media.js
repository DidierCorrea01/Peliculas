const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  genero_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Genero',
    required: true,
  },
  director_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Director',
    required: true,
  },
  productora_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Productora',
    required: true,
  },
  tipo_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tipo',
    required: true,
  },
  sinopsis: {
    type: String,
    required: true,
  },
  fecha_lanzamiento: {
    type: Date,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  imagen: {
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
  anio_estreno: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Media', mediaSchema);