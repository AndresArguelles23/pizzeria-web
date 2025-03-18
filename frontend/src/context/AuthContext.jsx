// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";

// Declaramos el contexto solo una vez
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
      // Si también manejas el carrito, elimínalo aquí:
      localStorage.removeItem("cart");
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
