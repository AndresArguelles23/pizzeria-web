import React from "react";
import { 
  Container, 
  Grid, 
  Card, 
  CardActionArea, 
  CardContent, 
  Typography, 
  Divider, 
  Box
} from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Inventory2Icon from '@mui/icons-material/Inventory2';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleIcon from '@mui/icons-material/People';
import EqualizerIcon from '@mui/icons-material/Equalizer';

const dashboardItems = [
  { 
    title: "Gestionar Productos", 
    icon: <Inventory2Icon fontSize="large" color="primary" />, 
    link: "/admin/products",
    ariaLabel: "Ir a gestionar productos"
  },
  { 
    title: "Gestionar Pedidos", 
    icon: <AssignmentIcon fontSize="large" color="primary" />, 
    link: "/admin/orders",
    ariaLabel: "Ir a gestionar pedidos"
  },
  { 
    title: "Gestionar Usuarios", 
    icon: <PeopleIcon fontSize="large" color="primary" />, 
    link: "/admin/users",
    ariaLabel: "Ir a gestionar usuarios"
  },
  { 
    title: "Ver Métricas", 
    icon: <EqualizerIcon fontSize="large" color="secondary" />, 
    link: "/admin/metrics",
    ariaLabel: "Ir a ver métricas"
  },
];

const AdminDashboard = () => {
  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ 
        textAlign: "center", 
        py: 3, 
        borderRadius: 2, 
        background: "linear-gradient(135deg, #1976d2 30%, #42a5f5 90%)", 
        color: "white",
        mb: 4,
        boxShadow: 3
      }}>
        <Typography variant="h4" fontWeight="bold">Panel de Administrador</Typography>
      </Box>
      <Divider sx={{ mb: 4 }} />
      <Grid container spacing={4}>
        {dashboardItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card 
                sx={{ 
                  borderRadius: 3,
                  transition: "transform 0.3s ease, box-shadow 0.3s ease", 
                  "&:hover": { transform: "scale(1.08)", boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.3)" } 
                }}
              >
                <CardActionArea 
                  component={Link} 
                  to={item.link} 
                  aria-label={item.ariaLabel}
                >
                  <Box sx={{ display: "flex", justifyContent: "center", pt: 4, mb: 2 }}>
                    <Box>{item.icon}</Box>
                  </Box>
                  <CardContent sx={{ p: 2 }}>
                    <Typography variant="h6" align="center" fontWeight="bold">
                      {item.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AdminDashboard;
