// Imports
const mongoose = require("mongoose");
const errors = require("../configs/error.codes.json");

// Constants
const schema = new mongoose.Schema({
	order_id: {
		type: String,
		required: [true, errors[400].orderIdRequired],
		trim: true,
	},
	order_details: {
		amount: {
			type: Number,
			required: [true, errors[500]],
			min: 0,
		},
		currency: {
			type: String,
			required: [true, errors[500]],
			trim: true,
		},
		receipt_number: {
			type: String,
			trim: true,
		},
	},
	payment_id: {
		type: String,
		required: [true, errors[400].paymentIdRequired],
		unique: true,
		trim: true,
	},
	payment_signature: {
		type: String,
		required: [true, errors[400].paymentSignatureRequired],
		trim: true,
	},
	user_id: {
		type: mongoose.Types.ObjectId,
		required: [true, errors[500]],
		ref: "user",
	},
	event_id: {
		type: mongoose.Types.ObjectId,
		required: [true, errors[500]],
		ref: "event",
	},
});

module.exports = mongoose.model("receipt", schema);