const express = require('express');
const router = express.Router();
const recipientSchema = require('../models/recipient')

router.post('/recipient', (req, res) => {
    recipientSchema.insertMany(req.body)
    .then((data) => res.json(data))
    .catch((err) => res.json({message: err}))
})

module.exports = router;