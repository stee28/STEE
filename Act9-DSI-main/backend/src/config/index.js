require('dotenv').config({ path: '../../../config/.env' });

const config = {
  // Configuración del servidor
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost'
  },
  
  // Configuración de MongoDB
  database: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/inventario_db'
  },
  
  // Configuración de JWT
  jwt: {
    secret: process.env.JWT_SECRET || 'tu-clave-secreta-muy-segura',
    expiresIn: process.env.JWT_EXPIRES_IN || '1h'
  },
  
  // Configuración de bcrypt
  bcrypt: {
    saltRounds: process.env.BCRYPT_SALT_ROUNDS || 10
  },
  
  // Configuración del entorno
  env: process.env.NODE_ENV || 'development'
};

module.exports = config;
