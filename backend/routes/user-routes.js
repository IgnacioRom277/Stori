const express = require('express');
const router = express.Router();
const userSchema = require('../models/user')

router.post('/user', (req, res) => {
    userSchema.insertMany(req.body)
    .then((data) => res.json(data))
    .catch((err) => res.json({message: err}))
})

module.exports = router;