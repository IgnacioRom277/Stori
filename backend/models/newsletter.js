const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const newsletterSchema = Schema([{
    filename: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    extension: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
}])

module.exports = mongoose.model('Newsletter', newsletterSchema);