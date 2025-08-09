// Validación con Joi para productos
const Joi = require('joi');

const productoValidationSchema = Joi.object({
  codigo: Joi.string().required().trim().min(1).messages({
    'string.empty': 'El código es requerido',
    'any.required': 'El código es requerido'
  }),
  nombre: Joi.string().required().trim().min(1).messages({
    'string.empty': 'El nombre es requerido',
    'any.required': 'El nombre es requerido'
  }),
  precio: Joi.number().required().positive().messages({
    'number.base': 'El precio debe ser un número',
    'number.positive': 'El precio debe ser mayor a 0',
    'any.required': 'El precio es requerido'
  }),
  stock: Joi.number().integer().min(0).default(0).messages({
    'number.base': 'El stock debe ser un número',
    'number.integer': 'El stock debe ser un número entero',
    'number.min': 'El stock no puede ser negativo'
  })
});

// Middleware de validación
const validarProducto = (req, res, next) => {
  console.log('Datos recibidos para validación:', req.body);
  
  const { error, value } = productoValidationSchema.validate(req.body, {
    abortEarly: false, // Mostrar todos los errores
    allowUnknown: true, // Permitir campos adicionales
    stripUnknown: true // Remover campos no definidos
  });
  
  if (error) {
    console.log('Error de validación:', error.details);
    return res.status(400).json({
      success: false,
      message: 'Datos de entrada inválidos',
      errors: error.details.map(detail => detail.message)
    });
  }
  
  req.body = value; // Datos validados y limpiados
  console.log('Datos validados:', value);
  next();
};

module.exports = { validarProducto };
