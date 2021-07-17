const mongoose = require('mongoose');
const bookingSchema = mongoose.Schema({
    OrderID: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Order'
    },
    senderID: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User Profile'
    },
    recieverID: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User Profile'
    },
    amount: {
        type: mongoose.SchemaTypes.Number
    },
});

const Bookings = mongoose.model('Booking', bookingSchema);
module.exports = Bookings;