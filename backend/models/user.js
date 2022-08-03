const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = Schema([{
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlegth: 8
    },
    isAdmin: {
        type: Boolean,
        required: true
    }
}]);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);