// frontend/src/components/Header.jsx
import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { AuthContext } from "../context/AuthContext";

import { jwtDecode } from "jwt-decode";

import { motion } from "framer-motion";

const Header = () => {
  const { token, setToken } = useContext(AuthContext);
  const location = useLocation();

  let isAdmin = false;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      isAdmin = decoded.role === "admin";
    } catch (error) {
      console.error("Error al decodificar el token:", error);
    }
  }

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("cart"); // Limpiar carrito al logout
    window.location.href = "/";
  };

  const navButtonStyle = (path) => ({
    textTransform: "none",
    mr: 1.5,
    fontWeight: "bold",
    color: location.pathname === path ? "#ffeb3b" : "#ffffff",
    borderBottom: location.pathname === path ? "2px solid #ffeb3b" : "none",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    "&:hover": {
      color: "#ffeb3b",
      transform: "scale(1.1)",
    },
  });

  return (
    <AppBar component="header" role="banner" position="static" sx={{ background: "linear-gradient(135deg, #b71c1c, #d32f2f)", boxShadow: "0px 4px 10px rgba(0,0,0,0.3)" }}>
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <motion.div whileHover={{ scale: 1.2, rotate: -5 }} transition={{ type: "spring", stiffness: 200 }}>
            <LocalPizzaIcon fontSize="large" sx={{ color: "#ffeb3b" }} />
          </motion.div>
          <Typography variant="h5" component={Link} to="/" aria-label="Inicio" sx={{ textDecoration: "none", color: "#ffffff", ml: 1, fontWeight: "bold", letterSpacing: "1px", transition: "color 0.3s ease", "&:hover": { color: "#ffeb3b" } }}>
            Mi Pizzería
          </Typography>
        </Box>
        <Button component={Link} to="/" sx={navButtonStyle("/")}>
          <HomeIcon fontSize="small" /> Home
        </Button>
        {token && (
          <>
            <Button component={Link} to="/cart" sx={navButtonStyle("/cart")}>
              <ShoppingCartIcon fontSize="small" /> Carrito
            </Button>
            {/* Mostrar "Mis Pedidos" solo si no es admin */}
            {!isAdmin && (
              <Button component={Link} to="/user/orders" sx={navButtonStyle("/user/orders")}>
                <ReceiptLongIcon fontSize="small" /> Mis Pedidos
              </Button>
            )}
            <Button component={Link} to="/profile" sx={navButtonStyle("/profile")}>
              <PersonIcon fontSize="small" /> Perfil
            </Button>
            {isAdmin && (
              <Button component={Link} to="/admin" sx={navButtonStyle("/admin")}>
                <AdminPanelSettingsIcon fontSize="small" /> Admin
              </Button>
            )}
            <Button onClick={handleLogout} sx={navButtonStyle("/")}>
              <ExitToAppIcon fontSize="small" /> Cerrar Sesión
            </Button>
          </>
        )}
        {!token && (
          <>
            <Button component={Link} to="/login" sx={navButtonStyle("/login")}>
              <LoginIcon fontSize="small" /> Iniciar Sesión
            </Button>
            <Button component={Link} to="/register" sx={navButtonStyle("/register")}>
              <AppRegistrationIcon fontSize="small" /> Registrarse
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
