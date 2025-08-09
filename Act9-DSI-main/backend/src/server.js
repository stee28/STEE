const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config({ path: '../../config/.env' });

const app = express();

// Middleware básico
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../frontend/public')));

// Conectar a MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Atlas conectado exitosamente'))
  .catch(err => console.error('❌ Error conectando a MongoDB:', err));

// Rutas esenciales
app.use('/api/auth', require('./routes/auth'));
app.use('/api/productos', require('./routes/productos'));
app.use('/api/movimientos', require('./routes/movimientos'));
app.use('/api/movimientos', require('./routes/movimientos'));

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/public', 'index.html'));
});

// Ruta catch-all para SPA
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/public', 'index.html'));
});

// Error handler middleware (debe ser el último middleware)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
});
