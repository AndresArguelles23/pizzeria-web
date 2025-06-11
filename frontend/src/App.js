// frontend/src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
const Home = React.lazy(() => import("./pages/Home"));
const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));
const Cart = React.lazy(() => import("./pages/Cart"));
const Profile = React.lazy(() => import("./pages/Profile"));
const AdminDashboard = React.lazy(() => import("./pages/admin/AdminDashboard"));
const AdminMetrics  = React.lazy(() => import("./pages/admin/AdminMetrics"));
const AdminProducts = React.lazy(() => import("./pages/admin/AdminProducts"));
const AdminOrders = React.lazy(() => import("./pages/admin/AdminOrders"));
const AdminUsers = React.lazy(() => import("./pages/admin/AdminUsers"));
const ProtectedRoute = React.lazy(() => import("./components/ProtectedRoute"));
const UserDashboard = React.lazy(() => import("./pages/user/UserDashboard"));
const UserProfile = React.lazy(() => import("./pages/user/UserProfile"));
const UserOrders = React.lazy(() => import("./pages/user/UserOrders"));
const UserSettings = React.lazy(() => import("./pages/user/UserSettings"));

function App() {
  return (
    <Router>
      <Header />
      <main style={{ minHeight: "80vh", padding: "1rem" }}>
        <React.Suspense fallback={<p>Cargando...</p>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          {/* Rutas de administración */}
          <Route path="/admin" element={<ProtectedRoute adminOnly={true}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/products" element={<ProtectedRoute adminOnly={true}><AdminProducts /></ProtectedRoute>} />
          <Route path="/admin/orders" element={<ProtectedRoute adminOnly={true}><AdminOrders /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute adminOnly={true}><AdminUsers /></ProtectedRoute>} />
          <Route path="/admin/metrics" element={<ProtectedRoute adminOnly={true}><AdminMetrics /></ProtectedRoute>} />
          {/* Rutas del usuario */}
          <Route path="/user" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
          <Route path="/user/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
          <Route path="/user/orders" element={<ProtectedRoute><UserOrders /></ProtectedRoute>} />
          <Route path="/user/settings" element={<ProtectedRoute><UserSettings /></ProtectedRoute>} />
        </Routes>
        </React.Suspense>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
