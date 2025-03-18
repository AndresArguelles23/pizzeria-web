// backend/src/api/upload.js
const multer = require("multer");

const storage = multer.memoryStorage(); // O usa diskStorage si prefieres guardar temporalmente
const upload = multer({ storage });

module.exports = upload;
