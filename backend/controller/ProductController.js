const Product = require('../models/ProductModel');

const productData = async (req, res) => {
  console.log('=== Product Upload Request ===');
  console.log('Request body:', req.body);
  console.log('Request file:', req.file);
  console.log('File details:', req.file ? {
    fieldname: req.file.fieldname,
    originalname: req.file.originalname,
    encoding: req.file.encoding,
    mimetype: req.file.mimetype,
    size: req.file.size,
    path: req.file.path,
    url: req.file.url,
    secure_url: req.file.secure_url
  } : 'No file');

  try {
    const { productTitle, productCategory, productPrice, productDescription } = req.body || {};
    
    // Validate required fields
    if (!productTitle || !productCategory || !productPrice || !productDescription) {
      const missing = [];
      if (!productTitle) missing.push('productTitle');
      if (!productCategory) missing.push('productCategory');
      if (!productPrice) missing.push('productPrice');
      if (!productDescription) missing.push('productDescription');
      return res.status(400).json({ 
        error: 'Missing required fields', 
        missingFields: missing 
      });
    }

    const productImage = req.file && (req.file.path || req.file.secure_url || req.file.url) 
      ? (req.file.path || req.file.secure_url || req.file.url) 
      : null;

    if (!productImage) {
      return res.status(400).json({ 
        error: 'Product image is required and must be jpg/jpeg/png',
        details: 'No file was uploaded or file type not supported'
      });
    }

    const productDetails = new Product({
      productTitle,
      productCategory,
      productPrice,
      productDescription,
      productImage,
    });

    const savedProduct = await productDetails.save();
    console.log('✅ Product Stored Successfully:', savedProduct);
    res.status(200).json({ 
      message: 'Product Stored Successfully', 
      product: savedProduct 
    });
  } catch (err) {
    console.error('❌ Error in ProductController:', err);
    console.error('Error stack:', err.stack);
    res.status(500).json({ 
      error: 'Failed to save product', 
      details: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
};

module.exports = productData;