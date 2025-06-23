const { cloudinary } = require("../config/cloudinaryConfig"); // ✅ Correct
const Information = require('../models/Information')
const User = require('../models/User')

const addInformationAndAttachToUser = async (req, res) => {
  try {
    const userId = req.user.id;

    // req.files is an object when using multer.fields()
    const files = req.files;

    const licenseFile = files?.license?.[0];
    const coverPictureFile = files?.cover_picture?.[0];
    const faydaFile = files?.fayda?.[0];

    if (!licenseFile || !coverPictureFile || !faydaFile) {
      return res.status(400).json({
        message: "License, cover picture, and Fayda image are required.",
      });
    }

    // Upload helper
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

    // Upload all files concurrently
    const [licenseUrl, coverUrl, faydaUrl] = await Promise.all([
      uploadToCloudinary(licenseFile),
      uploadToCloudinary(coverPictureFile),
      uploadToCloudinary(faydaFile),
    ]);

    // Create the Information record
    const information = await Information.create({
      license: licenseUrl,
      cover_picture: coverUrl,
      fayda: faydaUrl,
    });

    // Attach information to the authenticated user
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.information_id = information.id;
    await user.save();

    return res.status(201).json({
      message: "Information created and attached to user successfully.",
      information,
      user,
    });
  } catch (err) {
    console.error("Error in addInformationAndAttachToUser:", err);
    return res.status(500).json({
      message: "Server error",
      details: err.message,
    });
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
module.exports = { addInformationAndAttachToUser, getAllInformation };
