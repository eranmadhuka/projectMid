// utils/upload.js
const multer = require("multer");
const path = require("path");

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/studyMaterials");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

// File filter to allow only specific file types (e.g., PDFs)
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["application/pdf"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only PDF files are allowed"), false);
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;