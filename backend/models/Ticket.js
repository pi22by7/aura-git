// Imports
const mongoose = require("mongoose");
const ticketConfig = require("../configs/ticket.config.json");
const { jwtCreate } = require("../utils/utils");

// Constants
const schema = new mongoose.Schema({
	user_id: {
		type: mongoose.Types.ObjectId,
		required: true,
	},
	purpose: {
		type: String,
		enum: Object.values(ticketConfig.purposes),
		required: true,
	},
	data: {
		type: Object,
		default: null,
	},
	expireAfter: {
		type: Date,
		default: () => Date.now() + ticketConfig.expiration * 1000,
		expires: ticketConfig.expiration,
	},
});

// Methods
schema.methods.getReferenceToken = function () {
	return jwtCreate({
		id: String(this._id),
		user_id: this.user_id,
	}, `${(Math.floor(this.expireAfter - Date.now()) / 1000)}s`);
};

module.exports = mongoose.model("ticket", schema);
