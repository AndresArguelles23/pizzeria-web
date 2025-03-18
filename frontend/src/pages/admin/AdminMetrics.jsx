import React, { useState, useEffect } from "react";
import { 
  Container, 
  Grid, 
  Paper, 
  Typography, 
  Box, 
  IconButton, 
  Tooltip, 
  CircularProgress, 
  Snackbar, 
  Alert 
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { motion } from "framer-motion";
import api from "../../services/api";
import SalesChart from "../../components/SalesChart";
import OrdersStatusChart from "../../components/OrdersStatusChart";

const formatNumber = (number) => new Intl.NumberFormat("es-CO").format(number);

const AdminMetrics = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalSales: 0,
  });
  const [ordersData, setOrdersData] = useState([]);
  const [orderStatusData, setOrderStatusData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const fetchMetrics = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const [ordersRes, productsRes, usersRes] = await Promise.all([
        api.get("/orders"),
        api.get("/products"),
        api.get("/users"),
      ]);

      const orders = ordersRes.data;
      const products = productsRes.data;
      const users = usersRes.data;
      
      const totalSales = orders.reduce((acc, order) => acc + order.totalPrice, 0);

      const salesByDate = {};
      orders.forEach(order => {
        const date = new Date(order.createdAt).toISOString().split("T")[0];
        salesByDate[date] = (salesByDate[date] || 0) + order.totalPrice;
      });

      const salesChartData = Object.entries(salesByDate).map(([date, sales]) => ({
        date,
        sales,
      }));

      const statusCount = orders.reduce((acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1;
        return acc;
      }, {});

      const orderStatusChartData = Object.entries(statusCount).map(([status, count]) => ({
        name: status,
        value: count,
      }));

      setStats({
        totalProducts: products.length,
        totalOrders: orders.length,
        totalUsers: users.length,
        totalSales,
      });

      setOrdersData(salesChartData);
      setOrderStatusData(orderStatusChartData);

    } catch (error) {
      console.error("Error al obtener métricas:", error);
      setErrorMsg("Error al obtener métricas");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  const handleCloseSnackbar = () => setSnackbarOpen(false);

  return (
    <Container sx={{ py: 4 }}>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          mb: 3, 
          background: "linear-gradient(135deg, #1976d2 30%, #42a5f5 90%)", 
          color: "white", 
          p: 3, 
          borderRadius: 2, 
          boxShadow: 3 
        }}>
          <Typography variant="h4" fontWeight="bold">Métricas del Negocio</Typography>
          <Tooltip title="Actualizar métricas">
            <IconButton onClick={fetchMetrics} sx={{ color: "white" }}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </motion.div>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "40vh" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {["Productos", "Pedidos", "Usuarios", "Ventas Totales"].map((label, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Paper elevation={4} sx={{ p: 3, textAlign: "center", borderRadius: 2, boxShadow: 5 }}>
                  <Typography variant="h6" fontWeight="bold">{label}</Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {formatNumber([stats.totalProducts, stats.totalOrders, stats.totalUsers, stats.totalSales][index])}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}

          <Grid item xs={12} md={6}>
            <Paper elevation={4} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Ventas a lo largo del tiempo
              </Typography>
              <SalesChart data={ordersData} />
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={4} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Distribución de Pedidos por Estado
              </Typography>
              <OrdersStatusChart data={orderStatusData} />
            </Paper>
          </Grid>
        </Grid>
      )}

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: "100%" }}>
          {errorMsg}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AdminMetrics;
