const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
    // Event Partaking
    event_participated: {
        event_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
            required: true,
        },
        event_title: {
            type: String,
            ref: "Event.title",
        },
    },

    // Team Name
    team_name: {
        type: String,
        required: true,
    },

    // Team Leader
    team_leader: {
        id: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "user",
        },
        usn: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
    },
    // Team Members
    team_members: {
        type: [{
            id: {
                type: mongoose.Types.ObjectId,
                required: true,
                ref: "user"
            },
            email: {
                type: String,
                required: true
            },
            usn: {
                type: String,
                required: true,
            },
            name: {
                type: String,
                required: true,
            }
        }],
        default: {},
    },
}, { timestamps: true });

const Team = mongoose.model("Team", TeamSchema);

module.exports = Team;