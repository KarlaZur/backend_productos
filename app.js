const express = require('express');
const cors = require('cors');
const productoRoutes = require('./routes/producto.routes');
const usuarioRoutes = require('./routes/usuario.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/productos', productoRoutes);
app.use('/api/usuarios', usuarioRoutes);

module.exports = app;
