const express = require('express');
const router = express.Router();
const newsletterSchema = require('../models/newsletter');

router.post('/newsletter', (req, res) => {
    newsletterSchema.insertMany(req.body)
    .then((data) => res.json(data))
    .catch((err) => res.json({message: err}))
})

module.exports = router;