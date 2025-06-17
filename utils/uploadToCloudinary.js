const cloudinary = require('../config/cloudinaryConfig');
const fs = require('fs');

async function uploadToCloudinary(filePath) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'businessinfo', // optional: organize uploads in folder
      resource_type: 'image', // specify if images
    });

    // After uploading, remove the local file if you want:
    fs.unlinkSync(filePath);

    return result.secure_url; // This is the URL you store in DB
  } catch (error) {
    throw new Error('Cloudinary upload failed: ' + error.message);
  }
}

module.exports = uploadToCloudinary;
