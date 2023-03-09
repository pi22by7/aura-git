// Imports
const mongoose = require("mongoose");
const errors = require("../configs/error.codes.json");

// Constants
const schema = new mongoose.Schema({
	posted_at: {
		type: Number,
		default: Date.now,
	},
	edited_at: {
		type: Number,
		default: null,
	},
	content: {
		type: String,
		required: true,
		trim: [true, errors[400].newsContentRequired],
	},
});

module.exports = mongoose.model("news", schema);
