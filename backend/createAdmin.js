const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const User = require("./src/models/User");

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB conectado");

    // Verificar si ya existe un admin
    const existingAdmin = await User.findOne({ email: "admin@example.com" });
    if (existingAdmin) {
      console.log("El usuario admin ya existe.");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("adminpassword", 10);
    const admin = new User({
      name: "Admin User",
      email: "admin@example.com",
      password: hashedPassword,
      role: "admin", // Este campo permite identificarlo como administrador
    });

    await admin.save();
    console.log("Usuario administrador creado exitosamente.");
    process.exit();
  } catch (error) {
    console.error("Error al crear el admin:", error);
    process.exit(1);
  }
};

createAdmin();
