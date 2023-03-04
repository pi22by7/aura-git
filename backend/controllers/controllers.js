// Imports
const errors = require("../configs/error.codes.json");
const Response = require("../models/standard.response.model");

// Body
function complete(req, res) {
	return res.status(res.locals.status ?? 200).send(Response(false, res.locals.data, res.locals.profile));
}

function outOfOrder(req, res) {
	return res.status(503).send(Response(errors[503].serviceUnavailable));
}

module.exports = {
	complete,
	outOfOrder,
};