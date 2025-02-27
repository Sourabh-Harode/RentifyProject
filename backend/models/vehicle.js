const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
    name: String,
    price: Number,
    location: String,
    timeSlots: String,
    ownerId: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model('Vehicle', VehicleSchema);