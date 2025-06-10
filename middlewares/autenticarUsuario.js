// middlewares/autenticarUsuario.js

const jwt = require('jsonwebtoken');

const autenticarUsuario = (req, res, next) => {
  const token = req.cookies.auth_token;  // Obtener el token de la cookie

  if (!token) {
    return res.status(401).json({ mensaje: 'Acceso denegado. No se ha proporcionado un token' });
  }

  try {
    // Verificar el token y decodificar el payload
    const usuarioVerificado = jwt.verify(token, process.env.JWT_SECRET);
    req.usuarioId = usuarioVerificado.id;  // Guardar el ID del usuario en la solicitud
    next();  // Llamar al siguiente middleware o ruta
  } catch (error) {
    res.status(403).json({ mensaje: 'Token inválido' });
  }
};

module.exports = autenticarUsuario;
