// Imports
const mongoose = require("mongoose");
const eventConfig = require("../configs/event.config.json");
const errors = require("../configs/error.codes.json");
const { sluggify } = require("../utils/utils");

// Body
const EventSchema = new mongoose.Schema({
	kind: {
		type: String,
		enum: Object.values(eventConfig.kinds),
		default: eventConfig.defaultKind,
	},
	title: {
		type: String,
		trim: true,
		unique: true,
		required: true,
	},
	club: {
		type: String,
		trim: true,
		required: true,
	},
	description: {
		type: String,
		trim: true,
	},
	team_size: {
		type: Number,
	},
	min_team_size: {
		type: Number,
		default: 0,
	},
	rounds: {
		type: Number,
	},
	registration_limit: {
		type: String,
		trim: true,
	},
	registered_teams: {
		type: [{
			team_id: {
				type: mongoose.Types.ObjectId,
				required: true,
				ref: "team",
			},
			leader_id: {
				type: mongoose.Types.ObjectId,
				required: true,
				ref: "user",
			},
			payment: {
				status: {
					type: Boolean,
					default: false,
				},
				receipt_id: {
					type: mongoose.Types.ObjectId,
					default: null,
				},
			}
		}],
		default: [],
		validate: function (registered_teams) {
			if (!Array.isArray(registered_teams))
				return false;

			let limit = parseInt(this.registration_limit);
			if (!isNaN(limit) && registered_teams.length > limit)
				throw Error(errors[403].registrationsClosed);

			return true;
		},
	},
	rules: {
		type: [String],
	},
	event_coordinators: [{
		name: {
			type: String,
			trim: true,
		},
		contact_number: {
			type: String,
			trim: true,
		},
		image: {
			type: String,
			trim: true,
		},
	}],
	_slugs: {
		title: {
			type: String,
			trim: true,
			default: function () {
				return sluggify(this.title);
			},
		},
		club: {
			type: String,
			trim: true,
			default: function () {
				return sluggify(this.club);
			}
		},
	},
});

// Methods
EventSchema.methods.canRegister = function () {
	let limit = parseInt(this.registration_limit);
	if (!isNaN(limit) && this.registered_teams.length > limit)
		return false;

	return true;
};

const Event = mongoose.model("event", EventSchema);
module.exports = Event;
