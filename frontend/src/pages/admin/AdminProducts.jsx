// frontend/src/pages/admin/AdminProducts.jsx
import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Paper,
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  CircularProgress
} from "@mui/material";
import api from "../../services/api";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "pizza",
    description: "",
    stock: 0,
    imageUrl: ""
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  // Cargar la lista de productos
  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  // Maneja cambios en el formulario
  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  // Función para subir imagen a Cloudinary
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const token = localStorage.getItem("token");
      // Importante: No forzar Content-Type, axios lo hace automáticamente
      const res = await api.post("/upload", formData, {
        headers: { Authorization: token }
      });
      // Guarda la URL devuelta en el estado
      setNewProduct({ ...newProduct, imageUrl: res.data.imageUrl });
    } catch (error) {
      console.error("Error al subir imagen:", error);
      alert("Error al subir imagen");
    } finally {
      setUploading(false);
    }
  };

  // Crear un nuevo producto
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        ...newProduct,
        price: Number(newProduct.price),
        stock: Number(newProduct.stock)
      };
      const token = localStorage.getItem("token");
      await api.post("/products", productData, {
        headers: { Authorization: token }
      });
      alert("Producto creado");
      // Reinicia el formulario
      setNewProduct({ name: "", price: "", category: "pizza", description: "", stock: 0, imageUrl: "" });
      fetchProducts();
    } catch (error) {
      console.error("Error al crear producto:", error);
      alert("Error al crear producto");
    }
  };

  // Eliminar un producto
  const handleDeleteProduct = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/products/${id}`, { headers: { Authorization: token } });
      alert("Producto eliminado");
      fetchProducts();
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      alert("Error al eliminar producto");
    }
  };

  // Seleccionar producto para editar
  const handleEditProduct = (product) => {
    setEditingProduct(product);
  };

  // Actualizar un producto existente
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const updatedProduct = {
        ...editingProduct,
        price: Number(editingProduct.price),
        stock: Number(editingProduct.stock)
      };
      const token = localStorage.getItem("token");
      await api.put(`/products/${editingProduct._id}`, updatedProduct, {
        headers: { Authorization: token }
      });
      alert("Producto actualizado");
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error("Error al actualizar producto:", error);
      alert("Error al actualizar producto");
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Gestionar Productos
      </Typography>

      {/* Formulario para agregar producto */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Añadir Producto
        </Typography>
        <Box component="form" onSubmit={handleAddProduct} sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <TextField label="Nombre" name="name" value={newProduct.name} onChange={handleInputChange} required fullWidth />
          <TextField label="Precio" name="price" type="number" value={newProduct.price} onChange={handleInputChange} required fullWidth />
          <FormControl fullWidth>
            <InputLabel id="category-label">Categoría</InputLabel>
            <Select
              labelId="category-label"
              name="category"
              value={newProduct.category}
              label="Categoría"
              onChange={handleInputChange}
            >
              <MenuItem value="pizza">Pizza</MenuItem>
              <MenuItem value="hamburguesa">Hamburguesa</MenuItem>
              <MenuItem value="bebida">Bebida</MenuItem>
            </Select>
          </FormControl>
          <TextField label="Descripción" name="description" value={newProduct.description} onChange={handleInputChange} fullWidth />
          <TextField label="Stock" name="stock" type="number" value={newProduct.stock} onChange={handleInputChange} required fullWidth />
          <Button variant="outlined" component="label">
            {uploading ? "Subiendo Imagen..." : "Subir Imagen"}
            <input type="file" hidden onChange={handleImageUpload} />
          </Button>
          {newProduct.imageUrl && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2">Imagen Seleccionada:</Typography>
              <img src={newProduct.imageUrl} alt="Preview" style={{ maxWidth: "100%", borderRadius: "4px" }} />
            </Box>
          )}
          <Button type="submit" variant="contained" color="primary">
            Añadir Producto
          </Button>
        </Box>
      </Paper>

      <Divider sx={{ my: 3 }} />

      {/* Lista de Productos */}
      <Typography variant="h5" gutterBottom>
        Lista de Productos
      </Typography>
      <Grid container spacing={3}>
        {products.map((prod) => (
          <Grid item xs={12} sm={6} md={4} key={prod._id}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1 }}>
              {prod.imageUrl ? (
                <img src={prod.imageUrl} alt={prod.name} style={{ width: "100%", height: "140px", objectFit: "cover", borderRadius: "4px" }} />
              ) : (
                <Box sx={{ width: "100%", height: "140px", bgcolor: "#e0e0e0", borderRadius: "4px" }} />
              )}
              <Typography variant="h6">{prod.name}</Typography>
              <Typography variant="body1">
                ${prod.price} - {prod.category}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Stock: {prod.stock}
              </Typography>
              {prod.description && (
                <Typography variant="body2">{prod.description}</Typography>
              )}
              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                <Button variant="contained" color="secondary" onClick={() => handleDeleteProduct(prod._id)}>
                  Eliminar
                </Button>
                <Button variant="outlined" onClick={() => handleEditProduct(prod)}>
                  Editar
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {editingProduct && (
        <Paper sx={{ p: 3, mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Editar Producto
          </Typography>
          <Box component="form" onSubmit={handleUpdateProduct} sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            <TextField
              label="Nombre"
              name="name"
              value={editingProduct.name}
              onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
              required
              fullWidth
            />
            <TextField
              label="Precio"
              name="price"
              type="number"
              value={editingProduct.price}
              onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
              required
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel id="edit-category-label">Categoría</InputLabel>
              <Select
                labelId="edit-category-label"
                name="category"
                value={editingProduct.category}
                label="Categoría"
                onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
              >
                <MenuItem value="pizza">Pizza</MenuItem>
                <MenuItem value="hamburguesa">Hamburguesa</MenuItem>
                <MenuItem value="bebida">Bebida</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Descripción"
              name="description"
              value={editingProduct.description}
              onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
              fullWidth
            />
            <TextField
              label="Stock"
              name="stock"
              type="number"
              value={editingProduct.stock}
              onChange={(e) => setEditingProduct({ ...editingProduct, stock: e.target.value })}
              required
              fullWidth
            />
            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <Button type="submit" variant="contained" color="primary">
                Actualizar Producto
              </Button>
              <Button variant="outlined" onClick={() => setEditingProduct(null)}>
                Cancelar
              </Button>
            </Box>
          </Box>
        </Paper>
      )}
    </Container>
  );
};

export default AdminProducts;
