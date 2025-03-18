// backend/src/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getUserProfile, getAllUsers } = require("../controllers/userController");
const { protect, adminOnly } = require("../middlewares/authMiddleware");

// Rutas para usuarios, montadas en el prefijo "/api/users"
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);
router.get("/", protect, adminOnly, getAllUsers);

module.exports = router;
