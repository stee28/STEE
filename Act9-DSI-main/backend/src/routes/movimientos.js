const express = require('express');
const Movimiento = require('../models/Movimiento');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Obtener historial de movimientos
router.get('/', auth, async (req, res) => {
    try {
        const movimientos = await Movimiento.find()
            .populate('productoId', 'codigo nombre')
            .sort({ createdAt: -1 })
            .limit(50);

        res.json({
            success: true,
            data: movimientos
        });
    } catch (error) {
        console.error('Error obteniendo movimientos:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
});

module.exports = router;
