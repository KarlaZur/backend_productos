const express = require('express');
const app = express();
const routes = require('./routes');  // Importa el archivo index.js desde routes

app.use(express.json());  // Para manejar solicitudes con cuerpo en JSON

// Usa las rutas definidas en el archivo index.js
app.use(routes);

// Puedes agregar más configuraciones si las necesitas

module.exports = app;
