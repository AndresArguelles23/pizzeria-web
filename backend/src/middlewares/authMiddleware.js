// backend/src/middlewares/authMiddleware.js
require("dotenv").config();
const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "No autorizado: Token faltante" });
  }
  if (token.startsWith("Bearer ")) {
    token = token.slice(7).trim();
  } else {
    token = token.trim();
  }
  console.log("Token recibido para verificación:", token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Asignamos de forma consistente el id a _id
    req.user = { _id: decoded.userId || decoded.id, role: decoded.role };
    next();
  } catch (error) {
    console.error("Error en jwt.verify:", error);
    return res.status(401).json({ message: "Token no válido", error: error.message });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({ message: "Acceso denegado: solo administradores." });
};

module.exports = { protect, adminOnly };
