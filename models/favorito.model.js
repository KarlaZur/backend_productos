const mongoose = require('mongoose');

const favoritoSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  productos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Producto' }]
}, { timestamps: true });

module.exports = mongoose.model('Favorito', favoritoSchema);
