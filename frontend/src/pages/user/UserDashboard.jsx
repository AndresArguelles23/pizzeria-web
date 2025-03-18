import React from "react";
import { Link } from "react-router-dom";
import { 
  Container, 
  Typography, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText 
} from "@mui/material";

const UserDashboard = () => {
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Panel de Usuario
      </Typography>
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/user/profile">
            <ListItemText primary="Perfil" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/user/orders">
            <ListItemText primary="Mis Pedidos" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/user/settings">
            <ListItemText primary="Configuración" />
          </ListItemButton>
        </ListItem>
      </List>
    </Container>
  );
};

export default UserDashboard;
