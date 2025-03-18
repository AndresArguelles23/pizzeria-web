// frontend/src/pages/admin/AdminUsers.jsx
import React, { useState, useEffect } from "react";
import api from "../../services/api";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      // Asumiendo que el endpoint para usuarios es "/api/users"
      const res = await api.get("/api/users", { headers: { Authorization: `Bearer ${token}` } });
      setUsers(res.data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Gestionar Usuarios</h1>
      {users.length === 0 ? (
        <p>No hay usuarios.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user._id} style={{ marginBottom: "1rem" }}>
              <p><strong>Nombre:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Rol:</strong> {user.role}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminUsers;
