const express = require('express');
const router = express.Router();
const recipientController = require('../controllers/recipient-controller');

router.post('/recipient', recipientController.createRecipient)
router.post('/recipients', recipientController.createMultiRecipient)

module.exports = router;