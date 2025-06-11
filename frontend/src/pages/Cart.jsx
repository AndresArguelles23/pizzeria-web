// Cart.jsx
import React, { useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import api from "../services/api";
import useCart from "../hooks/useCart";
import usePageMeta from "../hooks/usePageMeta";

const formatPrice = (price) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
  }).format(price);

const Cart = () => {
  usePageMeta("Carrito - Pizzería Moderna", "Revisa los productos seleccionados antes de completar tu pedido");
  const { cart, removeItem, changeQuantity, clearCart, totalPrice } = useCart();
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const navigate = useNavigate();

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  const handleCheckout = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setSnackbar({ open: true, message: "Debes iniciar sesión para realizar el pedido", severity: "warning" });
      navigate("/login");
      return;
    }
    const orderProducts = cart.map((item) => ({
      product: item._id,
      quantity: item.quantity,
    }));
    try {
      setCheckoutLoading(true);
      // CORRECCIÓN: Agregamos "/api" antes de "/orders"
      await api.post("/api/orders", {
        products: orderProducts,
        totalPrice,
        paymentMethod: "prueba",
      });
      setSnackbar({ open: true, message: "Pedido realizado con éxito!", severity: "success" });
      setTimeout(() => {
        clearCart();
      }, 2000); // Espera 2 segundos antes de limpiar
    } catch (error) {
      console.error("Error en el checkout:", error.response?.data || error.message);
      setSnackbar({
        open: true,
        message: "Error al realizar el pedido: " + (error.response?.data?.message || error.message),
        severity: "error",
      });
    } finally {
      setCheckoutLoading(false);
    }
  };

  const handleCancelOrder = () => {
    if (window.confirm("¿Estás seguro de cancelar todo el pedido?")) {
      clearCart();
      setSnackbar({ open: true, message: "Pedido cancelado", severity: "info" });
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <ShoppingCartIcon fontSize="large" color="primary" /> Carrito de Compras
      </Typography>
      {cart.length === 0 ? (
        <Typography variant="body1" sx={{ textAlign: "center", mt: 4 }}>
          🛒 Tu carrito está vacío. ¡Agrega productos deliciosos!
        </Typography>
      ) : (
        <>
          <Grid container spacing={2}>
            {cart.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item._id}>
                <Paper
                  sx={{
                    p: 2,
                    transition: "all 0.3s",
                    "&:hover": { boxShadow: "0px 4px 20px rgba(0,0,0,0.2)", transform: "scale(1.02)" },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Box
                    component="img"
                    src={item.imageUrl || "https://via.placeholder.com/150"}
                    alt={item.name}
                    loading="lazy"
                    sx={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      mb: 2,
                    }}
                  />
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="body1">Precio: {formatPrice(item.price)}</Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <TextField
                      label="Cantidad"
                      type="number"
                      size="small"
                      inputProps={{ min: 1 }}
                      value={item.quantity}
                      onChange={(e) => changeQuantity(item._id, e.target.value)}
                      sx={{ width: "80px", mr: 1 }}
                    />
                    <IconButton color="error" onClick={() => removeItem(item._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    Subtotal: {formatPrice(item.price * item.quantity)}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
              Total: {formatPrice(totalPrice)}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <LoadingButton variant="contained" color="primary" onClick={handleCheckout} loading={checkoutLoading}>
                Realizar Pedido
              </LoadingButton>
              <Button variant="outlined" color="error" onClick={handleCancelOrder}>
                Cancelar Pedido
              </Button>
            </Box>
          </Box>
        </>
      )}
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Cart;
