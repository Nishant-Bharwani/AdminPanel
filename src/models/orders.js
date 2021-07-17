const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    senderID: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User Profile'
    },
    recieverID: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User Profile',
        // validate(recieverID) {
        //     if (recieverID == this.senderID) {
        //         throw new Error(`Sender and reciever can't be same`);
        //     }
        // }
    },

    pickupAddress: {
        type: String,
        required: true
    },
    pickupCity: {
        type: String,
        required: true,

    },
    pickupCountry: {
        type: String,
        required: true,
    },
    pickupState: {
        type: String,
        required: true,
    },
    pickupDate: {
        type: Date,
        required: true,
    },
    dropAddress: {
        type: String,
        required: true
    },
    dropCity: {
        type: String,
        required: true,

    },
    dropCountry: {
        type: String,
    },
    dropState: {
        type: String,
        required: true,
    },
    dropDate: {
        type: Date,
        required: true,
    },

    vehicleUsed: {
        type: mongoose.SchemaTypes.String
    }


});

const Order = new mongoose.model('Order', orderSchema);

module.exports = Order;