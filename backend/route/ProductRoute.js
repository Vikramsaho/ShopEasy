const express = require('express')
const uploadImage = require('../middleware/uploadImage')

const router = express.Router()

const productData  = require('../controller/ProductController')

// POST /product -> upload an image and save product data
router.post('/', (req, res, next) => {
  uploadImage.single('productImage')(req, res, (err) => {
    if (err) {
      console.error('Upload middleware error', err)
      return res.status(400).json({ error: err.message || 'Image upload failed' })
    }
    next()
  })
}, productData)

module.exports = router;