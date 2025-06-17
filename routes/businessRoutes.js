const express = require('express');
const multer = require('multer'); // File upload middleware
const { addBusinessinfo,getTest } = require('../controllers/businessinfoController');

const router = express.Router();

// Multer setup for handling file uploads in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Use named fields for better control
router.post(
  '/',
  upload.fields([
    { name: 'license', maxCount: 1 },
    { name: 'cover_picture', maxCount: 1 },
    { name: 'fayda', maxCount: 1 } // optional
  ]),
  addBusinessinfo
);
router.get('/',getTest)

module.exports = router;
