const express = require('express');
const multer = require('multer'); // File upload middleware
const {
  addBusinessinfo,
  getAllBusinessinfo,
} = require("../controllers/businessinfoController");

const router = express.Router();

// Multer setup for handling file uploads in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.any(), addBusinessinfo);
router.get("/", getAllBusinessinfo);
 

module.exports = router;
