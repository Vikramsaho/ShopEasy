const multer = require('multer');
const CloudinaryStorage  = require("multer-storage-cloudinary");
const cloudinary = require('../config/cloudinary');

console.log('UploadImage middleware initialized');
console.log('Cloudinary instance:', cloudinary);
console.log('Cloudinary uploader:', cloudinary.uploader);

const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'products',
    resource_type: 'image',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
  },
});

const uploadImage = multer({
  storage: imageStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

module.exports = uploadImage;