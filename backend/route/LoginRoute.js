const express = require('express');

const router = express.Router();

const loginController = require('../controller/LoginController');

// POST /login -> loginController.login
router.post('/', loginController.login);

module.exports = router;