// frontend/src/user/admin/UserOrders.jsx
import React, { useState, useEffect } from "react";
import api from "../../services/api";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", addresses: [] });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/users/profile", {
          headers: { Authorization: token },
        });
        setUser(res.data);
        setFormData({ name: res.data.name, addresses: res.data.addresses || [] });
      } catch (error) {
        console.error("Error al obtener perfil:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    // Aquí implementarías la actualización del perfil (endpoint PUT /users/profile)
    alert("Perfil actualizado (simulación)");
    setEditMode(false);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Perfil</h1>
      {user ? (
        <div>
          {editMode ? (
            <>
              <label>Nombre: </label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} />
              {/* Puedes agregar campos para editar direcciones u otros datos */}
              <button onClick={handleSave}>Guardar</button>
              <button onClick={() => setEditMode(false)}>Cancelar</button>
            </>
          ) : (
            <>
              <p><strong>Nombre:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              {user.addresses && user.addresses.length > 0 && (
                <>
                  <h3>Direcciones:</h3>
                  <ul>
                    {user.addresses.map((addr, index) => (
                      <li key={index}>{addr.street}, {addr.city}, {addr.zip}</li>
                    ))}
                  </ul>
                </>
              )}
              <button onClick={() => setEditMode(true)}>Editar Perfil</button>
            </>
          )}
        </div>
      ) : (
        <p>Cargando perfil...</p>
      )}
    </div>
  );
};

export default UserProfile;
