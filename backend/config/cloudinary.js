const cloudinary = require('cloudinary');

console.log('Cloudinary config started');
console.log('CLOUDINARY_NAME:', process.env.CLOUDINARY_NAME);
console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY ? '***' : 'MISSING');

// Use v2 API
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloudinary_url: process.env.CLOUDINARY_URL,
});

console.log('Cloudinary config completed');
console.log('Cloudinary v2 uploader available:', !!cloudinary.v2.uploader);

// Export the full cloudinary object (not just v2) for multer-storage-cloudinary
module.exports = cloudinary;