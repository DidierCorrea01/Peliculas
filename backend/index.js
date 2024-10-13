const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Importar las rutas
const generosRouter = require('./routes/generos');
const directoresRouter = require('./routes/directores');
const productorasRouter = require('./routes/productoras');
const tiposRouter = require('./routes/tipos');
const mediasRouter = require('./routes/medias'); 

// Cargar variables de entorno
dotenv.config();

// Crear la aplicación Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a la base de datos MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conexión a MongoDB exitosa'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

// Usar las rutas
app.use('/generos', generosRouter);
app.use('/directores', directoresRouter);
app.use('/productoras', productorasRouter);
app.use('/tipos', tiposRouter);
app.use('/medias', mediasRouter);

// Iniciar el servidor
const PORT = process.env.PORT || 3001; 
app.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`));