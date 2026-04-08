const express = require('express')

const getAllProducts  = require('../controller/GetProductDataController')

const router = express.Router()

// GET /product -> list all products stored in MongoDB
router.get('/', getAllProducts)

module.exports = router;