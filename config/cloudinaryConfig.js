const cloudinary = require('cloudinary').v2;

// Hardcoded Configuration
cloudinary.config({
    cloud_name: 'dddiaaofj', // Replace with your actual Cloudinary cloud name
    api_key: '868597764483733', // Replace with your actual API key
    api_secret: 'dT-9mngHlwVBIIiLUvAEAvKK9X0', // Replace with your actual API secret
    secure: true // Ensures HTTPS URLs
});

module.exports = cloudinary;
