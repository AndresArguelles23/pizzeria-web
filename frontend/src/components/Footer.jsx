import React from "react";
import { Box, Typography, Link, Stack } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        p: 2,
        mt: 4,
        textAlign: "center",
        backgroundColor: "background.paper",
        borderTop: "1px solid #e0e0e0",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © 2025 Pizzería - Todos los derechos reservados
      </Typography>
      <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 1 }}>
        <Link href="https://facebook.com" color="inherit" target="_blank" rel="noopener" aria-label="Facebook">
          <FacebookIcon />
        </Link>
        <Link href="https://twitter.com" color="inherit" target="_blank" rel="noopener" aria-label="Twitter">
          <TwitterIcon />
        </Link>
        <Link href="https://instagram.com" color="inherit" target="_blank" rel="noopener" aria-label="Instagram">
          <InstagramIcon />
        </Link>
      </Stack>
      <Typography variant="caption" display="block" sx={{ mt: 1 }}>
        Hecho con por Andres Julian Arguelles Manco
      </Typography>
    </Box>
  );
};

export default Footer;
