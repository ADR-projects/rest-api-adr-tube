const mongoose = require('mongoose')

const subscriberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    bday: {
        type: Date,
        required: true,
        default: Date.now
    },
    bio: {
        type: String,
        required: true,
        default: "Hi! I've joined ADR-Tube."
    }

})

module.exports = mongoose.model('Subscriber', subscriberSchema)