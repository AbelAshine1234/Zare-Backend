const express = require('express');
const multer = require('multer'); // File upload middleware
const {
  getAllInformation,
  addInformationAndAttachToUser,
} = require("../controllers/addInformationController");
const { authenticateUser } = require('../middlewares/authMiddleware');


const router = express.Router();

// Multer setup for handling file uploads in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  '/',
  authenticateUser, // ensure authenticated user
  upload.fields([
    { name: 'license', maxCount: 1 },
    { name: 'cover_picture', maxCount: 1 },
    { name: 'fayda', maxCount: 1 },
  ]),
  addInformationAndAttachToUser
);

router.get("/", getAllInformation);
 

module.exports = router;
