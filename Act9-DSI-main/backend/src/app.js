// Código adaptado por Steven
const express = require('express');
const cors = require('cors');
const path = require('path');
const config = require('./config');
const connectDB = require('./config/database');
const errorHandler = require('./middleware (personalizado)/errorHandler');

// Conectar a la base de datos
connectDB();

// Importar rutas
const authRoutes = require('./routes/auth');
const productosRoutes = require('./routes/productos');
const movimientosRoutes = require('./routes/movimientos');
const testRoutes = require('./routes/test');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, '../../frontend/public')));

// Rutas API
app.use('/api/test', testRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/movimientos', movimientosRoutes);

// Ruta para servir la aplicación principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/public/index.html'));
});

// Middleware de manejo de errores
app.use(errorHandler);

// Iniciar servidor
const PORT = config.server.port;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;
