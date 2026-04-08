const Product = require('../models/ProductModel');

const getAllProducts = async (req, res) => {
  try {
    
    const products = await Product.find().sort({ _id: -1 });
    res.status(200).json({ products });
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Failed to fetch products', details: err.message });
  }
};

module.exports = getAllProducts;