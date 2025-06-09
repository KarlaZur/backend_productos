const Carrito = require('../models/carrito.model');
const Producto = require('../models/producto.model');
const Usuario = require('../models/usuario.model');
const mongoose = require('mongoose');

exports.agregarProductoAlCarrito = async (req, res) => {
  try {
    const { usuarioId, productoId, cantidad } = req.body;

    // Verificar si los IDs son válidos
    if (!mongoose.Types.ObjectId.isValid(usuarioId)) {
      return res.status(400).json({ error: 'ID de usuario no válido' });
    }
    if (!mongoose.Types.ObjectId.isValid(productoId)) {
      return res.status(400).json({ error: 'ID de producto no válido' });
    }

    // Buscar el producto en la base de datos
    const producto = await Producto.findById(productoId);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Buscar el carrito del usuario
    let carrito = await Carrito.findOne({ usuario: usuarioId });

    // Si no existe el carrito, crearlo
    if (!carrito) {
      carrito = new Carrito({ usuario: usuarioId, productos: [] });
    }

    // Verificar si el producto ya está en el carrito
    const productoEnCarrito = carrito.productos.find(
      (item) => item.producto.toString() === productoId
    );

    if (productoEnCarrito) {
      // Si ya existe, actualizar la cantidad
      productoEnCarrito.cantidad += cantidad;
    } else {
      // Si no existe, agregar el nuevo producto
      carrito.productos.push({ producto: productoId, cantidad });
    }

    // Guardar el carrito
    await carrito.save();
    res.status(200).json({ mensaje: 'Producto agregado al carrito', carrito });
  } catch (error) {
    console.error('Error al agregar producto al carrito', error);
    res.status(500).json({ error: 'Error al agregar producto al carrito' });
  }
};
// Obtener productos del carrito
exports.obtenerCarrito = async (req, res) => {
  try {
    const { usuarioId } = req.params;
    const carrito = await Carrito.findOne({ usuario: usuarioId }).populate('productos.producto');
    if (!carrito) return res.status(404).json({ mensaje: 'No se encontró el carrito' });

    res.json({ carrito });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el carrito' });
  }
};

// Eliminar producto del carrito
exports.eliminarProductoDelCarrito = async (req, res) => {
  try {
    const { usuarioId, productoId } = req.params;
    const carrito = await Carrito.findOne({ usuario: usuarioId });
    if (!carrito) return res.status(404).json({ mensaje: 'No se encontró el carrito' });

    carrito.productos = carrito.productos.filter(p => p.producto.toString() !== productoId);
    await carrito.save();

    res.json({ mensaje: 'Producto eliminado del carrito', carrito });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto del carrito' });
  }
};

// Vaciar carrito
exports.vaciarCarrito = async (req, res) => {
  try {
    const { usuarioId } = req.params;
    const carrito = await Carrito.findOneAndDelete({ usuario: usuarioId });
    if (!carrito) return res.status(404).json({ mensaje: 'No se encontró el carrito' });

    res.json({ mensaje: 'Carrito vaciado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al vaciar el carrito' });
  }
};
