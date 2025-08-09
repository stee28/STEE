const express = require('express');
const Producto = require('../models/Producto');
const Movimiento = require('../models/Movimiento');
const { auth } = require('../middleware/auth');
const { validarProducto } = require('../middleware/validation');

const router = express.Router();

// Obtener todos los productos
router.get('/', auth, async (req, res) => {
    try {
        const productos = await Producto.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            data: productos
        });
    } catch (error) {
        console.error('Error obteniendo productos:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
});

// Crear producto
router.post('/', auth, async (req, res) => {
    try {
        console.log('📝 Datos recibidos en el servidor:', req.body);
        
        const { codigo, nombre, descripcion, precio, stock } = req.body;

        // Validaciones básicas
        if (!codigo || !nombre || precio === undefined || precio === null) {
            return res.status(400).json({
                success: false,
                message: 'Los campos código, nombre y precio son obligatorios'
            });
        }

        if (typeof precio !== 'number' || precio <= 0) {
            return res.status(400).json({
                success: false,
                message: 'El precio debe ser un número mayor a 0'
            });
        }

        // Verificar si ya existe el código
        const productoExistente = await Producto.findOne({ codigo });
        if (productoExistente) {
            return res.status(400).json({
                success: false,
                message: 'Ya existe un producto con este código'
            });
        }

        const producto = new Producto({ 
            codigo, 
            nombre, 
            descripcion: descripcion || '',
            precio, 
            stock: stock || 0 
        });
        await producto.save();

        // Crear movimiento inicial si hay stock
        if (stock > 0) {
            const movimiento = new Movimiento({
                productoId: producto._id,
                tipo: 'entrada',
                cantidad: stock,
                motivo: 'Stock inicial'
            });
            await movimiento.save();
        }

        res.status(201).json({
            success: true,
            data: producto,
            message: 'Producto creado exitosamente'
        });
    } catch (error) {
        console.error('Error creando producto:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
});

// Actualizar producto
router.put('/:id', auth, async (req, res) => {
    try {
        const { nombre, descripcion, precio } = req.body;

        const producto = await Producto.findByIdAndUpdate(
            req.params.id,
            { nombre, descripcion, precio },
            { new: true }
        );

        if (!producto) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            });
        }

        res.json({
            success: true,
            data: producto,
            message: 'Producto actualizado exitosamente'
        });
    } catch (error) {
        console.error('Error actualizando producto:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
});

// Eliminar producto
router.delete('/:id', auth, async (req, res) => {
    try {
        const producto = await Producto.findByIdAndDelete(req.params.id);

        if (!producto) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            });
        }

        res.json({
            success: true,
            message: 'Producto eliminado exitosamente'
        });
    } catch (error) {
        console.error('Error eliminando producto:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
});

// Actualizar stock
router.patch('/:id/stock', auth, async (req, res) => {
    try {
        console.log('📦 Actualizando stock - ID:', req.params.id);
        console.log('📦 Datos recibidos:', req.body);
        
        const { tipo, cantidad, motivo } = req.body;

        // Validaciones
        if (!tipo || !['entrada', 'salida'].includes(tipo)) {
            return res.status(400).json({
                success: false,
                message: 'Tipo de movimiento inválido. Debe ser "entrada" o "salida"'
            });
        }

        if (!cantidad || cantidad <= 0) {
            return res.status(400).json({
                success: false,
                message: 'La cantidad debe ser mayor a 0'
            });
        }

        if (!motivo?.trim()) {
            return res.status(400).json({
                success: false,
                message: 'El motivo es obligatorio'
            });
        }

        const producto = await Producto.findById(req.params.id);
        if (!producto) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            });
        }

        console.log(`📦 Stock actual: ${producto.stock}, Operación: ${tipo} ${cantidad}`);

        if (tipo === 'entrada') {
            producto.stock += cantidad;
        } else if (tipo === 'salida') {
            if (producto.stock < cantidad) {
                return res.status(400).json({
                    success: false,
                    message: `Stock insuficiente. Stock actual: ${producto.stock}, cantidad solicitada: ${cantidad}`
                });
            }
            producto.stock -= cantidad;
        }

        await producto.save();

        // Crear movimiento
        const movimiento = new Movimiento({
            productoId: producto._id,
            tipo,
            cantidad,
            motivo
        });
        await movimiento.save();

        console.log(`✅ Stock actualizado exitosamente. Nuevo stock: ${producto.stock}`);

        res.json({
            success: true,
            data: producto,
            message: 'Stock actualizado exitosamente'
        });
    } catch (error) {
        console.error('❌ Error actualizando stock:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
});

module.exports = router;
