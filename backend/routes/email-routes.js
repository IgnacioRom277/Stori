const express = require('express');
const router = express.Router();
const emailController = require('../controllers/email-controller');

router.put('/email', emailController.sendMail)

module.exports = router;