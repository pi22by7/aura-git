// Imports
const mongoose = require("mongoose");
const errors = require("../configs/error.codes.json");

// Constants
const schema = new mongoose.Schema({
	event: {
		type: mongoose.Types.ObjectId,
		required: [true, errors[400].eventIdRequired],
		ref: "event",
		index: true,
	},
	user: {
		type: mongoose.Types.ObjectId,
		required: [true, errors[500]],
		ref: "user",
		index: true,
	},
	links: {
		type: [String],
		required: [true, errors[400].linksBodyRequired],
		validate: (links) => {
			if (!Array.isArray(links))
				throw Error(errors[400].invalidLinksBody);

			if (links.length === 0)
				throw Error(errors[400].linkRequired);

			return true;
		},
	},
	notes: {
		type: String,
		default: "",
		trim: true,
	},
	last_modified: {
		type: Number,
		default: Date.now,
	},
});
schema.index({ event: 1, user: 1 }, { unique: true });

// Methods
schema.methods.getPopulated = async function () {
	return this.populate([
		{
			path: "event",
		},
		{
			path: "user",
			select: "-password",
		},
	]);
};

module.exports = mongoose.model("submission", schema);
