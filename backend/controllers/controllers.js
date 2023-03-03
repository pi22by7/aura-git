// Imports
const Response = require("../models/standard.response.model");

// Body
function complete(req, res) {
	return res.status(res.locals.status ?? 200).send(Response(false, res.locals.data, res.locals.profile));
}

module.exports = {
	complete,
};