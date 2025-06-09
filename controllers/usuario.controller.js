const Usuario = require('../models/usuario.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Crear usuario
exports.registrarUsuario = async (req, res) => {
  try {
    const { nombre, email, contraseña } = req.body;
    const existe = await Usuario.findOne({ email });
    if (existe) return res.status(400).json({ mensaje: 'El correo ya está registrado' });

    const hash = await bcrypt.hash(contraseña, 10);
    const nuevoUsuario = new Usuario({ nombre, email, contraseña: hash });
    await nuevoUsuario.save();
    res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

// Login usuario
exports.loginUsuario = async (req, res) => {
  try {
    const { email, contraseña } = req.body;
    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    const valido = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!valido) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ mensaje: 'Login exitoso', token, usuario });
  } catch (error) {
    res.status(500).json({ error: 'Error en el login' });
  }
};
// Obtener favoritos
exports.obtenerFavoritos = async (req, res) => {
    try {
      const { idUsuario } = req.params;
      const usuario = await Usuario.findById(idUsuario).populate('favoritos');
      if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
  
      res.json({ favoritos: usuario.favoritos });
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener favoritos' });
    }
  };
  
  // Realizar compra
  exports.realizarCompra = async (req, res) => {
    try {
      const { idUsuario, productos } = req.body;
      const usuario = await Usuario.findById(idUsuario);
      if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
  
      productos.forEach(p => {
        usuario.compras.push({ producto: p.id, cantidad: p.cantidad });
      });
  
      await usuario.save();
      res.json({ mensaje: 'Compra realizada', compras: usuario.compras });
    } catch (error) {
      res.status(500).json({ error: 'Error al procesar compra' });
    }
  };
  
  // Ver historial de compras
  exports.obtenerCompras = async (req, res) => {
    try {
      const { idUsuario } = req.params;
      const usuario = await Usuario.findById(idUsuario).populate('compras.producto');
      if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
  
      res.json({ compras: usuario.compras });
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener compras' });
    }
  };
  
  exports.agregarFavorito = async (req, res) => {
    try {
      const { idUsuario, productoId } = req.body;
      const usuario = await Usuario.findById(idUsuario);
      if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
  
      if (!usuario.favoritos.includes(productoId)) {
        usuario.favoritos.push(productoId);
        await usuario.save();
      }
  
      res.json({ mensaje: 'Producto agregado a favoritos' });
    } catch (error) {
      res.status(500).json({ error: 'Error al agregar favorito' });
    }
  };
  