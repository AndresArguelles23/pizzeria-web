import React, { useState, useEffect, useMemo, useContext } from "react";
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Snackbar,
  Alert,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import useCart from "../hooks/useCart";
import { AuthContext } from "../context/AuthContext"; // Importamos el contexto de autenticación

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });
  const [category, setCategory] = useState("Todos");

  const { addItem } = useCart();
  const { token } = useContext(AuthContext); // Obtenemos el token del contexto de autenticación
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await api.get("/products");
        setProducts(res.data);
      } catch (error) {
        setSnackbar({ open: true, message: "Error al cargar productos", severity: "error" });
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    if (category === "Todos") return products;
    return products.filter((product) => product.category.toLowerCase() === category.toLowerCase());
  }, [products, category]);

  const handleAddToCart = (product) => {
    if (!token) {
      setSnackbar({ open: true, message: "Debes iniciar sesión para agregar productos", severity: "warning" });
      return;
    }

    addItem(product);
    setSnackbar({ open: true, message: `${product.name} agregado al carrito`, severity: "success" });
  };

  return (
    <Container sx={{ p: 4, minHeight: "100vh" }} maxWidth="lg">
      <Typography variant="h4" align="center" sx={{ fontWeight: "bold", mb: 3, color: "#d32f2f" }}>
        🍕🥤🍔 Nuestros Productos
      </Typography>

      <Box display="flex" justifyContent="center" mb={3}>
        <ToggleButtonGroup
          value={category}
          exclusive
          onChange={(event, newCategory) => newCategory && setCategory(newCategory)}
        >
          <ToggleButton value="Todos">Todos</ToggleButton>
          <ToggleButton value="pizza">Pizzas</ToggleButton>
          <ToggleButton value="bebida">Bebidas</ToggleButton>
          <ToggleButton value="hamburguesa">Hamburguesas</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {loading ? (
        <Typography align="center">Cargando productos...</Typography>
      ) : filteredProducts.length === 0 ? (
        <Typography align="center">No hay productos disponibles en esta categoría</Typography>
      ) : (
        <Grid container spacing={2} justifyContent="center">
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 5px 10px rgba(0,0,0,0.15)",
                  transition: { duration: 0.2, ease: "easeInOut" },
                }}
              >
                <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                  <CardMedia
                    component="img"
                    height="180"
                    image={product.imageUrl || "https://via.placeholder.com/300?text=Sin+Imagen"}
                    alt={product.name}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: "bold" }}>
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.description.length > 50 ? `${product.description.substring(0, 50)}...` : product.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "space-between", p: 1 }}>
                    <motion.div whileHover={{ scale: 1.05 }}>
                      <Button
                        variant="contained"
                        startIcon={<VisibilityIcon />}
                        onClick={() => navigate(`/producto/${product._id}`)} // Redirige a detalles del producto
                        sx={{
                          background: "linear-gradient(135deg, #d32f2f, #ff6659)",
                          borderRadius: "6px",
                          padding: "6px 12px",
                          fontSize: "0.75rem",
                          fontWeight: "bold",
                          color: "#fff",
                          minWidth: "auto",
                          "&:hover": {
                            background: "linear-gradient(135deg, #b71c1c, #ff5447)",
                          },
                        }}
                      >
                        Ver más
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }}>
                      <Button
                        variant="contained"
                        startIcon={<ShoppingCartIcon />}
                        onClick={() => handleAddToCart(product)}
                        sx={{
                          background: "linear-gradient(135deg, #f57c00, #ff9800)",
                          borderRadius: "6px",
                          padding: "6px 12px",
                          fontSize: "0.75rem",
                          fontWeight: "bold",
                          color: "#fff",
                          minWidth: "auto",
                          "&:hover": {
                            background: "linear-gradient(135deg, #e65100, #ff9100)",
                          },
                        }}
                      >
                        Agregar
                      </Button>
                    </motion.div>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Container>
  );
};

export default Home;
