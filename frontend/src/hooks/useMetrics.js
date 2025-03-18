import { useState, useEffect } from "react";
import api from "../services/api";

const useMetrics = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalSales: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMetrics = async () => {
    setLoading(true);
    setError("");
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

      setStats({
        totalProducts: products.length,
        totalOrders: orders.length,
        totalUsers: users.length,
        totalSales,
      });
    } catch (err) {
      console.error("Error al obtener métricas:", err);
      setError("Error al obtener métricas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
    // Opcional: puedes agregar un intervalo para actualizar las métricas automáticamente
    // const interval = setInterval(fetchMetrics, 300000); // cada 5 minutos
    // return () => clearInterval(interval);
  }, []);

  return { stats, loading, error, fetchMetrics };
};

export default useMetrics;
