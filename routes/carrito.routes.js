const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carrito.controller');

// Crear/Agregar al carrito
router.post('/agregar', carritoController.agregarProductoAlCarrito);

// Obtener productos del carrito
router.get('/:usuarioId', carritoController.obtenerCarrito);

// Eliminar producto del carrito
router.delete('/:usuarioId/producto/:productoId', carritoController.eliminarProductoDelCarrito);

// Vaciar carrito
router.delete('/:usuarioId', carritoController.vaciarCarrito);

module.exports = router;
