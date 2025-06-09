// Importar las rutas de los controladores
const express = require('express');
const router = express.Router();

const productoRoutes = require('./producto.routes');
const carritoRoutes = require('./carrito.routes');
const favoritoRoutes = require('./favoritos.routes');
const usuarioRoutes = require('./usuario.routes');

// Aquí van las rutas definidas previamente
router.use('/api/productos', productoRoutes);
router.use('/api/carrito', carritoRoutes);
router.use('/api/favoritos', favoritoRoutes);
router.use('/api/usuarios', usuarioRoutes);

module.exports = router;
