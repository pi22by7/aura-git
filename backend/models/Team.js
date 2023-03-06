// Imports
const mongoose = require("mongoose");
const errors = require("../configs/error.codes.json");

// Constants
const TeamSchema = new mongoose.Schema({
    // Event Partaking
    event_participated: {
        event_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
            required: [true, errors[400].participationEventIdRequired],
            index: true,
        },
        event_title: {
            type: String,
            ref: "Event.title",
            required: [true, errors[400].participationEventTitleRequired],
        },
    },
    team_name: {
        type: String,
        required: [true, errors[400].teamNameRequired],
        trim: true,
        minlength: [1, errors[400].shortName],
    },
    team_leader: {
        id: {
            type: mongoose.Types.ObjectId,
            ref: "user",
            required: [true, errors[400].teamLeaderIdRequired],
            index: true,
        },
        aura_id: {
            type: String,
            required: [true, errors[400].auraIdRequired],
            trim: true,
        },
        usn: {
            type: String,
            required: [true, errors[400].teamLeaderUsnRequired],
        },
        name: {
            type: String,
            required: [true, errors[400].teamLeaderNameRequired],
        },
        email: {
            type: String,
            required: [true, errors[400].teamLeaderEmailRequired],
        },
    },
    team_members: {
        type: [{
            id: {
                type: mongoose.Types.ObjectId,
                ref: "user",
                required: [true, errors[400].teamMemberIdRequired],
            },
            aura_id: {
                type: String,
                required: [true, errors[400].teamMemberAuraIdRequired],
                trim: true,
            },
            email: {
                type: String,
                required: [true, errors[400].teamMemberEmailRequired],
            },
            usn: {
                type: String,
                required: [true, errors[400].teamMemberUsnRequired],
            },
            name: {
                type: String,
                required: [true, errors[400].teamMemberNameRequired],
            },
        }],
        default: {},
    },
}, { timestamps: true });
TeamSchema.index({ "event_participated.event_id": 1, "team_leader.id": 1 }, { unique: true });

const Team = mongoose.model("team", TeamSchema);

module.exports = Team;