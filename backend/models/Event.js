// Imports
const mongoose = require("mongoose");

// Body
const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    club: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    team_size: {
        type: Number,
        required: true,
    },
    rounds: {
        type: Number,
        required: true,
    },
    registration_limit: {
        type: String,
        required: true,
    },
    rules: {
        type: [String],
        required: true,
    },
    event_coordinators: [{
        name: {
            type: String,
            required: true,
        },
        contact_number: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
    }],
});

const Event = mongoose.model("event", EventSchema);
module.exports = Event;
