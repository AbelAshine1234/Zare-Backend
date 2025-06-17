const cloudinary = require("../config/cloudinaryConfig");
const Businessinfo = require("../models/Businessinfo");

const getTest = async (req, res) => {
  res.status(201).json({ message: "Category created successfully" });
};
// Feature 1: Add Category
const addBusinessinfo = async (req, res) => {
  try {
    // Ensure files exist
    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one picture is required." });
    }

    // Upload images to Cloudinary
    const uploadPromises = req.files.map((file) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "fayda", resource_type: "image" },
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

    res
      .status(201)
      .json({ message: "Category created successfully", category });
  } catch (err) {
    console.error("Error creating category:", err);
    res.status(500).json({ message: "Server error", details: err.message });
  }
};
module.exports = {
  addBusinessinfo
};
