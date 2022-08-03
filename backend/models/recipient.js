const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const recipientSchema = new Schema([{
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    newsletters: {
        type: Array,
        default: [],
        required: false
    }
}]);

recipientSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Recipient', recipientSchema);