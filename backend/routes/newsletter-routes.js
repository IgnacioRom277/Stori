const express = require('express');
const router = express.Router();
const newsletterController = require('../controllers/newsletter-controller');

router.post('/newsletter', newsletterController.createNewsletter)

module.exports = router;