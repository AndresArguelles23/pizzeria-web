# 🍕 Pizzería Web - Sistema de Pedidos Online

Este es un sistema de pedidos en línea para una pizzería, desarrollado con **React (Material-UI) en el frontend** y **Node.js con Express en el backend**.

## 🚀 Características Principales
- 📜 **Registro e inicio de sesión** con autenticación JWT.
- 🍕 **Gestor de productos** para pizzas, bebidas y hamburguesas.
- 🛒 **Carrito de compras** intuitivo.
- 📦 **Gestor de pedidos** para que los usuarios puedan realizar y seguir sus compras.
- 🌎 **Diseño responsivo** con Material-UI.
- 📊 **Dashboard** para administradores.
- ☁️ **Carga de imágenes** con Cloudinary.

## 🛠 Tecnologías Usadas
### **Frontend:**
- React con Material-UI
- React Router para la navegación
- Axios para consumir la API
- Context API para la gestión de autenticación

### **Backend:**
- Node.js con Express
- MongoDB con Mongoose (o base de datos relacional según evolución del proyecto)
- Autenticación con JSON Web Tokens (JWT)
- Cloudinary para gestión de imágenes

## 📦 Instalación y Ejecución
### 1️⃣ Clonar el repositorio
```sh
git clone https://github.com/TU_USUARIO/NOMBRE_DEL_REPO.git
cd NOMBRE_DEL_REPO
```

### 2️⃣ Configurar variables de entorno
Crear un archivo `.env` en la raíz del backend con las siguientes variables:
```env
PORT=5000
MONGO_URI=tu_conexion_a_mongodb
JWT_SECRET=tu_secreto
CLOUDINARY_CLOUD_NAME=tu_nombre
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

### 3️⃣ Instalar dependencias
Ejecuta estos comandos en las carpetas **frontend** y **backend**:
```sh
# En el frontend
cd frontend
npm install

# En el backend
cd ../backend
npm install
```

### 4️⃣ Ejecutar la aplicación
```sh
# Iniciar el backend
cd backend
npm start

# Iniciar el frontend
cd ../frontend
npm start
```

La aplicación estará disponible en `http://localhost:3000/` y la API en `http://localhost:5000/`.

## 📜 Estado del Proyecto
- ✅ Login y registro funcional
- ✅ Productos con carga de imágenes
- ✅ Carrito de compras
- 🔄 Pendiente: Implementar métodos de pago

## 📌 Contribuir
Si deseas contribuir al proyecto:
1. **Haz un fork** del repositorio.
2. Crea una nueva rama (`git checkout -b feature-nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -m "Descripción del cambio"`).
4. Sube los cambios a tu rama (`git push origin feature-nueva-funcionalidad`).
5. Abre un Pull Request.

---

💡 _Este proyecto está en desarrollo y se seguirá optimizando._

