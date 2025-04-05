const express = require('express');
const multer = require('multer'); // File upload middleware
const {
    addCategory,
    addImagesToCategory,
    removeImagesFromCategory,
    fetchAllCategories,
    dropCategories,
    getCategoryById
} = require('../controllers/categoryController');

const router = express.Router();

// Multer setup for handling file uploads in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Routes

// Route 1: Create a new category
router.post('/', upload.any(), addCategory);

// Route 2: Add images to an existing category
router.post('/:categoryId/images', upload.any(), addImagesToCategory);

// Route 3: Delete images from an existing category
router.delete('/:categoryId/images', removeImagesFromCategory);

// Route 4: Fetch all categories with images
router.get('/', fetchAllCategories);

// Route 5: Drop all categories
router.delete('/', dropCategories);

// Route 6: Get one category by ID
router.get('/:categoryId', getCategoryById);

module.exports = router;
