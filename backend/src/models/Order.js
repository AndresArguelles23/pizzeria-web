// backend/src/models/Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pendiente", "en preparación", "en camino", "entregado", "cancelado"],
      default: "pendiente",
    },
    paymentMethod: {
      type: String,
      enum: ["efectivo", "tarjeta", "paypal", "prueba"],
      default: "prueba",
    },
    estimatedDeliveryTime: { type: String },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
