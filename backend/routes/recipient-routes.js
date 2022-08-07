const express = require('express');
const router = express.Router();
const recipientController = require('../controllers/recipient-controller');

router.post('/recipient', recipientController.createRecipient)
router.post('/recipients', recipientController.createMultiRecipient)
router.get('/recipient-list', recipientController.getRecipients)
router.post('/unsubscribe', recipientController.unsubscribeRecipient)

module.exports = router;