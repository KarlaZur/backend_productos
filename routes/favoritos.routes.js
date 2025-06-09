const express = require('express');
const router = express.Router();
const favoritoController = require('../controllers/favorito.controller');

// Agregar producto a favoritos
router.post('/agregar', favoritoController.agregarAFavoritos);

// Obtener productos favoritos
router.get('/:usuarioId', favoritoController.obtenerFavoritos);

// Eliminar producto de favoritos
router.delete('/:usuarioId/producto/:productoId', favoritoController.eliminarDeFavoritos);

module.exports = router;
