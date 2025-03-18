const express = require("express");
const router = express.Router();
const cloudinary = require("../config/cloudinary");
const upload = require("../api/upload");

router.post("/", upload.single("image"), (req, res) => {
  console.log("Archivo recibido:", req.file); // Para verificar que se reciba el archivo
  if (!req.file) {
    return res.status(400).json({ message: "No se envió ningún archivo" });
  }
  
  const uploadStream = cloudinary.uploader.upload_stream(
    { folder: "pizzeria" }, // Puedes cambiar "pizzeria" por la carpeta que prefieras en Cloudinary
    (error, result) => {
      if (error) {
        console.error("Error en Cloudinary:", error);
        return res.status(500).json({ message: "Error al subir imagen", error });
      }
      res.status(200).json({ imageUrl: result.secure_url });
    }
  );
  
  uploadStream.end(req.file.buffer);
});

module.exports = router;
