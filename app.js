const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes');

// Configuración de CORS
app.use(cors({
  origin: '*', // Esto permite todas las solicitudes (cuidado en producción)
  credentials: true, 
}));

app.use(express.json());  // Para manejar solicitudes con cuerpo en JSON

// Usa las rutas definidas en el archivo index.js
app.use(routes);

// Puedes agregar más configuraciones si las necesitas

module.exports = app;
