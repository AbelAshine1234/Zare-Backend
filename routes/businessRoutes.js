const express = require('express');
const multer = require('multer'); // File upload middleware
const { addBusinessinfo,getTest } = require('../controllers/businessinfoController');

const router = express.Router();

// Multer setup for handling file uploads in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

 

module.exports = router;
