// src/controllers/uploadController.js

const cloudinary = require("../config/cloudinary");

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No se envió ningún archivo" });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "pizzeria",
    });

    res.json({ imageUrl: result.secure_url });
  } catch (error) {
    res.status(500).json({ message: "Error al subir imagen", error });
  }
};

module.exports = { uploadImage };
