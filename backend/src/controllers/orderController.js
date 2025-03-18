// backend/src/controllers/orderController.js
const Order = require("../models/Order");
const getOrders = async (req, res) => {
  try {
    let orders;
    // Usa userId del token; si no existe, intenta con id
    const userId = req.user.userId || req.user.id;
    if (req.user && req.user.role === "admin") {
      orders = await Order.find()
        .populate("user")              // Poblamos el campo 'user'
        .populate("products.product")  // Poblamos los productos
        .sort({ createdAt: -1 });
    } else {
      orders = await Order.find({ user: userId })
        .populate("user")
        .populate("products.product")
        .sort({ createdAt: -1 });
    }
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener pedidos", error: error.message });
  }
};


const createOrder = async (req, res) => {
  try {
    const { products, totalPrice, paymentMethod } = req.body;
    if (!products || !Array.isArray(products) || products.length === 0 || !totalPrice) {
      return res.status(400).json({ message: "Faltan datos del pedido" });
    }
    // Opcional: asignar explícitamente el estado inicial "pendiente"
    const orderData = {
      user: req.user.userId,
      products,
      totalPrice,
      paymentMethod,
      status: "pendiente" // Esto es redundante si el esquema ya tiene un default
    };
    
    const newOrder = new Order(orderData);
    await newOrder.save();
    console.log("Pedido creado:", newOrder); // Depuración
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el pedido", error: error.message });
  }
};


const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ message: "Debe proporcionar un nuevo estado" });
    }
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }
    order.status = status;
    await order.save();
    console.log(`Pedido ${order._id} actualizado a: ${status}`);
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el estado del pedido", error: error.message });
  }
};

module.exports = { getOrders, createOrder, updateOrderStatus };
