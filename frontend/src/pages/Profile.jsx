import React, { useState, useEffect } from "react";
import { Container, Paper, Typography, Box, List, ListItem, ListItemText } from "@mui/material";
import api from "../services/api";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/users/profile", {
          headers: { Authorization: token },
        });
        setUser(res.data);
      } catch (error) {
        console.error("Error al obtener perfil:", error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Perfil de Usuario
        </Typography>
        {user ? (
          <Box>
            <Typography variant="body1">
              <strong>Nombre:</strong> {user.name}
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> {user.email}
            </Typography>
            {user.addresses && user.addresses.length > 0 && (
              <>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Direcciones:
                </Typography>
                <List>
                  {user.addresses.map((addr, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={`${addr.street}, ${addr.city}, ${addr.zip}`} />
                    </ListItem>
                  ))}
                </List>
              </>
            )}
          </Box>
        ) : (
          <Typography variant="body1">Cargando perfil...</Typography>
        )}
      </Paper>
    </Container>
  );
};

export default Profile;
