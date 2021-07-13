const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate(email) {
            if (!validator.isEmail(email)) {
                throw new Error(`The "${email}" is not of email type`);
            }
        }
    },
    encryptedPassword: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'member'],
        required: true
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;