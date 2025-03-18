// backend/src/app.js
const express = require("express");
const path = require("path");
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

// Configurar CORS para permitir solicitudes desde el frontend
app.use(cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200
}));

app.use(express.json());

// Rutas de la API
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
