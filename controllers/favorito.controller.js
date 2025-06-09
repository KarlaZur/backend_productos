const Favorito = require('../models/favorito.model');
const Producto = require('../models/producto.model');

// Agregar producto a favoritos
exports.agregarAFavoritos = async (req, res) => {
  try {
    const { usuarioId, productoId } = req.body;

    let favorito = await Favorito.findOne({ usuario: usuarioId });
    if (!favorito) {
      // Si no existe un favorito para el usuario, lo creamos
      favorito = new Favorito({ usuario: usuarioId, productos: [productoId] });
      await favorito.save();
      return res.status(201).json({ mensaje: 'Producto agregado a favoritos', favorito });
    }

    // Si el producto ya está en favoritos, no lo agregamos
    if (favorito.productos.includes(productoId)) {
      return res.status(400).json({ mensaje: 'Producto ya está en favoritos' });
    }

    favorito.productos.push(productoId);
    await favorito.save();

    res.json({ mensaje: 'Producto agregado a favoritos', favorito });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar a favoritos' });
  }
};

// Obtener productos favoritos
exports.obtenerFavoritos = async (req, res) => {
  try {
    const { usuarioId } = req.params;
    const favorito = await Favorito.findOne({ usuario: usuarioId }).populate('productos');
    if (!favorito) return res.status(404).json({ mensaje: 'No se encontraron favoritos' });

    res.json({ favoritos: favorito.productos });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los favoritos' });
  }
};

// Eliminar producto de favoritos
exports.eliminarDeFavoritos = async (req, res) => {
  try {
    const { usuarioId, productoId } = req.params;
    const favorito = await Favorito.findOne({ usuario: usuarioId });
    if (!favorito) return res.status(404).json({ mensaje: 'No se encontró la lista de favoritos' });

    favorito.productos = favorito.productos.filter(p => p.toString() !== productoId);
    await favorito.save();

    res.json({ mensaje: 'Producto eliminado de favoritos', favorito });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar de favoritos' });
  }
};
