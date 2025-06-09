const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');

router.post('/register', usuarioController.registrarUsuario);
router.post('/login', usuarioController.loginUsuario);
router.post('/favoritos', usuarioController.agregarFavorito);
router.get('/favoritos/:id', usuarioController.obtenerFavoritos);

//router.post('/compras', usuarioController.confirmarCompra);
router.get('/compras/:id', usuarioController.obtenerCompras);

module.exports = router;
