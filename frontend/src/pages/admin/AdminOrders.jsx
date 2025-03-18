import React, { useState, useEffect } from "react";
import {
  Container,
  CircularProgress,
  Typography,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  TextField,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { motion } from "framer-motion";
import api from "../../services/api";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [filter, setFilter] = useState("");
  const [updatingOrderId, setUpdatingOrderId] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No hay token, usuario no autenticado");
        return;
      }
      const res = await api.get("/orders", { headers: { Authorization: `Bearer ${token}` } });
      setOrders(res.data);
    } catch (error) {
      console.error("Error al obtener pedidos:", error);
      setSnackbar({ open: true, message: "Error al obtener pedidos", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    if (!window.confirm(`¿Deseas cambiar el estado a "${newStatus}"?`)) return;
    setUpdatingOrderId(orderId);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No autorizado");
        return;
      }
      await api.put(
        `/orders/${orderId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
      setSnackbar({ open: true, message: "Estado actualizado", severity: "success" });
    } catch (error) {
      console.error("Error al actualizar estado del pedido:", error);
      setSnackbar({ open: true, message: "Error al actualizar estado", severity: "error" });
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  const filteredOrders = orders.filter((order) => {
    const searchStr = (
      order._id +
      " " +
      order.status +
      " " +
      (order.user?.name || "") +
      " " +
      new Date(order.createdAt).toLocaleString()
    ).toLowerCase();
    return searchStr.includes(filter.toLowerCase());
  });

  return (
    <Container sx={{ padding: "2rem" }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Gestión de Pedidos
          </Typography>
          <Tooltip title="Actualizar pedidos">
            <IconButton onClick={fetchOrders}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </motion.div>
      <TextField
        label="Buscar pedidos (ID, Estado, Cliente, Fecha)"
        variant="outlined"
        fullWidth
        sx={{ mb: 3 }}
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70vh" }}>
          <CircularProgress />
        </Box>
      ) : filteredOrders.length === 0 ? (
        <Typography variant="body1" align="center">
          No hay pedidos
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredOrders.map((order) => (
            <Grid item xs={12} key={order._id}>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
                <Card sx={{ boxShadow: 4, borderRadius: 2 }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">Pedido #{order._id}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Cliente: {order.user?.name || "Usuario eliminado"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Fecha: {new Date(order.createdAt).toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total: ${order.totalPrice.toLocaleString("es-CO")}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, fontWeight: "bold" }}>
                      Estado: {order.status}
                    </Typography>
                    <FormControl fullWidth sx={{ mt: 2 }}>
                      <InputLabel id={`status-label-${order._id}`}>Cambiar Estado</InputLabel>
                      <Select
                        labelId={`status-label-${order._id}`}
                        value={order.status}
                        label="Cambiar Estado"
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        disabled={updatingOrderId === order._id}
                      >
                        <MenuItem value="pendiente">Pendiente</MenuItem>
                        <MenuItem value="en preparación">En preparación</MenuItem>
                        <MenuItem value="en camino">En camino</MenuItem>
                        <MenuItem value="entregado">Entregado</MenuItem>
                        <MenuItem value="cancelado">Cancelado</MenuItem>
                      </Select>
                    </FormControl>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AdminOrders;
