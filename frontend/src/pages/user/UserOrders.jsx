// frontend/src/pages/user/UserOrders.jsx
import React, { useState, useEffect, useMemo } from "react";
import { 
  Container, 
  Typography, 
  TextField, 
  List, 
  Paper, 
  Box, 
  Skeleton, 
  Snackbar, 
  Alert, 
  Pagination, 
  IconButton, 
  Collapse 
} from "@mui/material";
import { Grow } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import api from "../../services/api";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedOrders, setExpandedOrders] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/api/orders");
        console.log("Pedidos recibidos:", res.data);
        setOrders(res.data);
      } catch (error) {
        console.error("Error al obtener pedidos:", error);
        setErrorMsg("Error al obtener pedidos");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const searchStr = (
        order._id +
        " " +
        order.status +
        " " +
        (order.user?.name || "") +
        " " +
        new Date(order.createdAt).toLocaleString()
      ).toLowerCase();
      return searchStr.includes(searchTerm.toLowerCase());
    });
  }, [orders, searchTerm]);

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * ordersPerPage;
    return filteredOrders.slice(startIndex, startIndex + ordersPerPage);
  }, [filteredOrders, currentPage]);

  const toggleOrderDetails = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  return (
    <Container sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Mis Pedidos
      </Typography>
      <TextField
        label="Buscar pedidos (ID, Estado, Cliente, Fecha)"
        variant="outlined"
        fullWidth
        sx={{ mb: 3 }}
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
      />
      {loading ? (
        <>
          <Skeleton variant="rectangular" height={100} sx={{ mb: 2 }} />
          <Skeleton variant="rectangular" height={100} sx={{ mb: 2 }} />
          <Skeleton variant="rectangular" height={100} sx={{ mb: 2 }} />
        </>
      ) : errorMsg ? (
        <Alert severity="error">{errorMsg}</Alert>
      ) : filteredOrders.length === 0 ? (
        <Typography variant="body1">No tienes pedidos.</Typography>
      ) : (
        <>
          <List>
            {paginatedOrders.map((order) => (
              <Grow in={true} key={order._id}>
                <Paper sx={{ p: 2, mb: 2 }}>
                  <Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography variant="body1" fontWeight="bold">
                        Pedido #{order._id}
                      </Typography>
                      <IconButton onClick={() => toggleOrderDetails(order._id)} aria-label="Toggle details">
                        {expandedOrders[order._id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </IconButton>
                    </Box>
                    <Typography variant="body2">
                      <strong>Fecha:</strong> {new Date(order.createdAt).toLocaleString()}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Total:</strong> ${order.totalPrice}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, fontWeight: "bold" }}>
                      Estado: {order.status || "Sin estado"}
                    </Typography>
                    <Collapse in={expandedOrders[order._id]} timeout="auto" unmountOnExit>
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                          Productos:
                        </Typography>
                        <Box component="ul" sx={{ listStyleType: "disc", ml: 2, m: 0, p: 0 }}>
                          {order.products &&
                            order.products.map((item, index) => (
                              <Box component="li" key={item?.product?._id || index}>
                                <Typography variant="body2">
                                  {item?.product?.name || "Producto eliminado"} x {item?.quantity || 0}
                                </Typography>
                              </Box>
                            ))}
                        </Box>
                      </Box>
                    </Collapse>
                  </Box>
                </Paper>
              </Grow>
            ))}
          </List>
          {totalPages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(e, page) => setCurrentPage(page)}
                color="primary"
              />
            </Box>
          )}
        </>
      )}
      <Snackbar open={Boolean(errorMsg)} autoHideDuration={6000} onClose={() => setErrorMsg("")}>
        <Alert onClose={() => setErrorMsg("")} severity="error" sx={{ width: "100%" }}>
          {errorMsg}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UserOrders;
