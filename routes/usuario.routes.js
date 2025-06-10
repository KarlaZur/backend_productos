const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');
const autenticarUsuario = require('../middlewares/autenticarUsuario'); 

router.post('/register', usuarioController.registrarUsuario);
router.post('/login', autenticarUsuario, usuarioController.loginUsuario);
router.post('/favoritos', autenticarUsuario, usuarioController.agregarFavorito);
router.get('/favoritos/:id', autenticarUsuario, usuarioController.obtenerFavoritos);
router.post('/obtener-id', usuarioController.obtenerIdUsuarioPorEmail);
router.post('/compras', autenticarUsuario, usuarioController.realizarCompra);
router.get('/compras/:id', autenticarUsuario, usuarioController.obtenerCompras);


module.exports = router;
