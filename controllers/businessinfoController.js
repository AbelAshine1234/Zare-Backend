const { cloudinary } = require("../config/cloudinaryConfig"); // ✅ Correct
const Businessinfo = require("../models/Businessinfo");

const addBusinessinfo = async (req, res) => {
  try {
    // Ensure files exist
    if (!req.files || req.files.length < 3) {
      return res
        .status(400)
        .json({
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
    const businessinfo = await Businessinfo.create({
      license: licenseUrl,
      cover_picture: coverUrl,
      fayda: faydaUrl,
    });

    res
      .status(201)
      .json({ message: "Business info created successfully", businessinfo });
  } catch (err) {
    console.error("Error creating businessinfo:", err);
    res.status(500).json({ message: "Server error", details: err.message });
  }
};

const getAllBusinessinfo = async (req, res) => {
  try {
    const businesses = await Businessinfo.findAll();
    res
      .status(200)
      .json({
        message: "All business info fetched successfully",
        data: businesses,
      });
  } catch (err) {
    console.error("Error fetching business info:", err);
    res.status(500).json({ message: "Server error", details: err.message });
  }
};
module.exports = { addBusinessinfo, getAllBusinessinfo };
