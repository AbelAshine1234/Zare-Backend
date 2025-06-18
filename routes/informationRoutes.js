const express = require('express');
const multer = require('multer'); // File upload middleware
const {
   addInformation,
  getAllInformation,
} = require("../controllers/addInformationController");

const router = express.Router();

// Multer setup for handling file uploads in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.any(), addInformation);
router.get("/", getAllInformation);
 

module.exports = router;
