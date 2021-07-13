const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    pickupAddress: {
        type: String,
        required: true
    },
    pickupDate: {
        type: Date,
        required: true,
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
    dropAddress: {
        type: String,
        required: true
    },
    dropDate: {
        type: Date,
        required: true,
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

    modeOfTravel: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true
    },
    reciever: {
        type: String
    }

});

const Order = new mongoose.model('Order', orderSchema);

module.exports = Order;