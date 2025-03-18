// backend/src/app.js
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const uploadRoutes = require("./routes/uploadRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://pizzamar.netlify.app"
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error("CORS: Origen no permitido"), false);
    }
    return callback(null, true);
  },
  optionsSuccessStatus: 200
}));

app.use(express.json());

// Montar las rutas de la API con prefijo "/api"
app.use("/api/upload", uploadRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// Middleware para rutas no definidas
app.use((req, res, next) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error("Error global:", err.stack);
  res.status(500).json({ message: "Error interno del servidor" });
});

module.exports = app;
