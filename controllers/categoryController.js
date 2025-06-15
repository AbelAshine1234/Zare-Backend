const cloudinary = require('../config/cloudinaryConfig');
const Category = require('../models/Category');

// Feature 1: Add Category
const addCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        // Check if category already exists
        const existingCategory = await Category.findOne({ where: { name } });
        if (existingCategory) {
            return res.status(400).json({ message: 'Category already exists.' });
        }

        // Ensure files exist
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'At least one picture is required.' });
        }

        // Upload images to Cloudinary
        const uploadPromises = req.files.map(file => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: 'categories', resource_type: 'image' },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result.secure_url);
                    }
                );
                stream.end(file.buffer);
            });
        });

        const imageUrls = await Promise.all(uploadPromises);

        // Create the category
        const category = await Category.create({
            name,
            description,
            images: imageUrls,
        });

        res.status(201).json({ message: 'Category created successfully', category });
    } catch (err) {
        console.error('Error creating category:', err);
        res.status(500).json({ message: 'Server error', details: err.message });
    }
};

// Feature 2: Add Images to Existing Category
const addImagesToCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;

        // Find the category
        const category = await Category.findByPk(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found.' });
        }

        // Ensure files exist
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'At least one picture is required.' });
        }

        // Upload images to Cloudinary
        const uploadPromises = req.files.map(file => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: 'categories', resource_type: 'image' },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result.secure_url);
                    }
                );
                stream.end(file.buffer);
            });
        });

        const imageUrls = await Promise.all(uploadPromises);

        // Add new images to the category
        category.images = [...category.images, ...imageUrls];
        await category.save();

        res.status(200).json({ message: 'Images added successfully.', category });
    } catch (err) {
        console.error('Error adding images to category:', err);
        res.status(500).json({ message: 'Server error', details: err.message });
    }
};

// Feature 3: Delete Images from Existing Category
const removeImagesFromCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { imageUrls } = req.body; // Array of image URLs to delete

        // Find the category
        const category = await Category.findByPk(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found.' });
        }

        // Remove the images from Cloudinary
        const deletePromises = imageUrls.map(url => {
            const publicId = url.split('/').pop().split('.')[0]; // Extract the public ID
            return cloudinary.uploader.destroy(`categories/${publicId}`);
        });
        await Promise.all(deletePromises);

        // Remove the URLs from the `images` array
        category.images = category.images.filter(url => !imageUrls.includes(url));
        await category.save();

        res.status(200).json({ message: 'Images deleted successfully.', category });
    } catch (err) {
        console.error('Error removing images from category:', err);
        res.status(500).json({ message: 'Server error', details: err.message });
    }
};

const getCategoryById = async (req, res) => {
    try {
        const { categoryId } = req.params;

        // Find the category by its ID
        const category = await Category.findByPk(categoryId);

        if (!category) {
            return res.status(404).json({ message: 'Category not found.' });
        }

        res.status(200).json(category);
    } catch (err) {
        console.error('Error fetching category:', err);
        res.status(500).json({ message: 'Server error', details: err.message });
    }
};


// Feature 4: Show All Categories with Images
const fetchAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json(categories);
    } catch (err) {
        console.error('Error fetching categories:', err);
        res.status(500).json({ message: 'Server error', details: err.message });
    }
};

// Feature 5: Drop Categories
const dropCategories = async (req, res) => {
    try {
        await Category.destroy({ where: {} }); // Delete all categories
        res.status(200).json({ message: 'All categories dropped successfully.' });
    } catch (err) {
        console.error('Error dropping categories:', err);
        res.status(500).json({ message: 'Server error', details: err.message });
    }
};

module.exports = {
    addCategory,
    addImagesToCategory,
    removeImagesFromCategory,
    fetchAllCategories,
    dropCategories,
    getCategoryById
};
