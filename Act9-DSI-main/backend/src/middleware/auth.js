// Código adaptado por Steven
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token de acceso requerido'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secreto');
        const usuario = await Usuario.findById(decoded.id);
        
        if (!usuario) {
            return res.status(401).json({
                success: false,
                message: 'Usuario no válido'
            });
        }

        req.usuario = usuario;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Token no válido'
        });
    }
};

module.exports = { auth };
