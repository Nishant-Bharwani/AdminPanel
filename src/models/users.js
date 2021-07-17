const mongoose = require('mongoose');
const validator = require('validator');
const userProfileSchema = mongoose.Schema({
    name: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    email: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true,
        validate(email) {
            if (!validator.isEmail(email)) {
                throw new Error(`The "${email}" is not of email type`);
            }
        }
    },
    phone: {
        type: mongoose.SchemaTypes.Number,
        required: true,
        unique: true
    },
    totalDeliveryDone: {
        type: mongoose.SchemaTypes.Number,
        default: 0
    },
    totalRequestRaised: {
        type: mongoose.SchemaTypes.Number,
        default: 0
    },
    totalItemRecieved: {
        type: mongoose.SchemaTypes.Number,
        default: 0
    },
    _IDProof: {
        type: mongoose.SchemaTypes.Boolean
    },
    addressProof: {
        type: mongoose.SchemaTypes.Boolean
    }
});

const UserProfile = mongoose.model('User Profile', userProfileSchema);
module.exports = UserProfile;