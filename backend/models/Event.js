// Imports
const mongoose = require("mongoose");
const eventConfig = require("../configs/event.config.json");
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
	rounds: {
		type: Number,
	},
	registration_limit: {
		type: String,
		trim: true,
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

const Event = mongoose.model("event", EventSchema);
module.exports = Event;
