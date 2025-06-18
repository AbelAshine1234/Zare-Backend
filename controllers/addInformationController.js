const { cloudinary } = require("../config/cloudinaryConfig"); // ✅ Correct
const Information = require('../models/Information')

const addInformation = async (req, res) => {
  try {
    // Ensure files exist
    if (!req.files || req.files.length < 3) {
      return res.status(400).json({
        message: "License, cover picture, and Fayda image are required.",
      });
    }

    // Map uploaded files by original field names
    const filesByField = {};
    req.files.forEach((file) => {
      filesByField[file.fieldname] = file;
    });

    const requiredFields = ["license", "cover_picture", "fayda"];

    for (const field of requiredFields) {
      if (!filesByField[field]) {
        return res.status(400).json({ message: `${field} image is required.` });
      }
    }

    // Helper to upload a single file
    const uploadToCloudinary = (file) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "businessinfo", resource_type: "image" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result.secure_url);
          }
        );
        stream.end(file.buffer);
      });
    };

    // Upload each image
    const [licenseUrl, coverUrl, faydaUrl] = await Promise.all([
      uploadToCloudinary(filesByField["license"]),
      uploadToCloudinary(filesByField["cover_picture"]),
      uploadToCloudinary(filesByField["fayda"]),
    ]);

    // Save to DB
    const information = await Information.create({
      license: licenseUrl,
      cover_picture: coverUrl,
      fayda: faydaUrl,
    });

    res
      .status(201)
      .json({ message: "Information created successfully", information });
  } catch (err) {
    console.error("Error creating businessinfo:", err);
    res.status(500).json({ message: "Server error", details: err.message });
  }
};

const getAllInformation = async (req, res) => {
  try {
    const informations = await Information.findAll();
    res.status(200).json({
      message: "All Information fetched successfully",
      data: informations,
    });
  } catch (err) {
    console.error("Error fetching Information:", err);
    res.status(500).json({ message: "Server error", details: err.message });
  }
};
module.exports = { addInformation, getAllInformation };
