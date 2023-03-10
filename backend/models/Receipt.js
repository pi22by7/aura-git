// Imports
const mongoose = require("mongoose");
const errors = require("../configs/error.codes.json");

// Constants
const schema = new mongoose.Schema({
	user: {
		type: mongoose.Types.ObjectId,
		required: [true, errors[400].userIdRequired],
		ref: "user",
	},
	team: {
		type: mongoose.Types.ObjectId,
		required: [true, errors[400].teamIdRequired],
		ref: "team",
	},
	event: {
		type: mongoose.Types.ObjectId,
		required: [true, errors[400].eventIdRequired],
		ref: "event",
	},
	transaction_id: {
		type: String,
		required: [true, errors[400].transactionIdRequired],
		trim: true,
		unique: true,
	},
}, { timestamps: true });
schema.index({ team: 1, event: 1 }, { unique: true });

schema.methods.getPopulated = async function () {
	return this.populate([
		{
			path: "user",
			select: "-password",
		},
		{
			path: "event",
		},
		{
			path: "team",
		},
	]);
};

module.exports = mongoose.model("receipt", schema);