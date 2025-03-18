// backend/src/routes/orderRoutes.js
const express = require("express");
const router = express.Router();
const { getOrders, createOrder, updateOrderStatus } = require("../controllers/orderController");
const { protect, adminOnly } = require("../middlewares/authMiddleware");

router.route("/")
  .get(protect, getOrders)
  .post(protect, createOrder);

router.route("/:id")
  .put(protect, updateOrderStatus);

module.exports = router;
