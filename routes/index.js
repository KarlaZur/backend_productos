const express = require('express');
const router = express.Router();

const productoController = require('../controllers/producto.controller');

// Rutas de productos
router.get('/productos', productoController.obtenerProductos);
router.get('/productos/:id', productoController.obtenerProductoPorId);
router.post('/productos', productoController.crearProducto);

module.exports = router;
