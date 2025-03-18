// backend/src/controllers/productController.js
const Product = require("../models/Product");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos", error: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, price, category, description, stock, imageUrl } = req.body;
    if (!name || !price || !category || !imageUrl) {
      return res.status(400).json({ message: "Faltan datos requeridos" });
    }
    const newProduct = new Product({ name, price, category, description, stock, imageUrl });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el producto", error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Producto no encontrado" });
    
    const updatedData = {
      name: req.body.name || product.name,
      price: req.body.price || product.price,
      category: req.body.category || product.category,
      description: req.body.description || product.description,
      stock: req.body.stock || product.stock,
      imageUrl: req.body.imageUrl || product.imageUrl,
    };

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el producto", error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: "Producto no encontrado" });
    res.json({ message: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el producto", error: error.message });
  }
};

module.exports = { getProducts, createProduct, updateProduct, deleteProduct };
