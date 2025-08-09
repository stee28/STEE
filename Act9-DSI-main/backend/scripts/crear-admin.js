const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '../../config/.env' });

async function crearAdmin() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Conectado a MongoDB');

        // Definir esquema directamente
        const usuarioSchema = new mongoose.Schema({
            nombre: String,
            correo: { type: String, unique: true },
            contraseña: String,
            rol: String,
            activo: { type: Boolean, default: true }
        });

        const Usuario = mongoose.model('Usuario', usuarioSchema);

        // Eliminar usuario existente si existe
        await Usuario.deleteOne({ correo: 'admin@inventario.com' });
        console.log('Usuario anterior eliminado (si existía)');

        // Crear contraseña hasheada
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123', salt);

        // Crear nuevo usuario
        const admin = new Usuario({
            nombre: 'Administrador',
            correo: 'admin@inventario.com',
            contraseña: hashedPassword,
            rol: 'admin',
            activo: true
        });

        await admin.save();
        console.log('✅ Usuario admin creado exitosamente');
        console.log('Email: admin@inventario.com');
        console.log('Password: admin123');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Conexión cerrada');
    }
}

crearAdmin();
