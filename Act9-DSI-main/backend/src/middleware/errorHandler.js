// Middleware de manejo de errores centralizado
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log del error
  console.error('❌ Error:', err);

  // Error de validación de Mongoose
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    return res.status(400).json({
      success: false,
      message: 'Error de validación',
      errors: message
    });
  }

  // Error de duplicado (código único)
  if (err.code === 11000) {
    const message = 'El código del producto ya existe';
    return res.status(400).json({
      success: false,
      message
    });
  }

  // Error de Mongoose CastError
  if (err.name === 'CastError') {
    const message = 'ID de recurso no válido';
    return res.status(404).json({
      success: false,
      message
    });
  }

  // Error por defecto
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Error interno del servidor'
  });
};

module.exports = errorHandler;
