import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider, CssBaseline, GlobalStyles } from '@mui/material';
import theme from './theme'; // Asegúrate de tener creado el archivo theme.js

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={{
        html: { fontSize: '16px' },
        body: { margin: 0, padding: 0, boxSizing: 'border-box' },
        '*': { boxSizing: 'inherit' },
      }} />
      <App />
    </ThemeProvider>
  </AuthProvider>
);
