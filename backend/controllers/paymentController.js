// Imports
const errors = require("../configs/error.codes.json");
const Response = require("../models/standard.response.model");
const Receipt = require("../models/Receipt");
const { errorHandler } = require("../utils/utils");
const { rpCreateOrderByScheme, rpFetchOrderById } = require("../utils/razorpay.util");

// Constants
const errorMessages = Object.freeze({
	byCodes: {
		11000: {
			status: 403,
			message: errors[403].paymentIdAlreadyUsed,
		},
	},
});

const getError = (error) => {
	let msg;

	// Check by code
	if ((msg = errorMessages.byCodes[error.code])) return msg;

	// Unhandled error
	return errorHandler(error);
};

// Body
async function paymentCreateOrderController(req, res, next) {
	if (!res.locals.user)
		return res.status(401).send(Response(errors[401].authRequired));

	try {
		const { scheme = undefined } = req.query;

		// `scheme`
		if (!scheme)
			return res.status(400).send(Response(errors[400].schemeRequired));

		const order = await rpCreateOrderByScheme(scheme);
		if (!order)
			return res.status(400).send(Response(errors[400].invalidScheme));

		if (!res.locals.data)
			res.locals.data = {};
		res.locals.data.order = order;
	} catch (error) {
		const { status, message } = errorHandler(error);
		return res.status(status).send(Response(message));
	}

	return next();
}

async function paymentSubmitOrderReceiptController(req, res, next) {
	if (!res.locals.user)
		return res.status(401).send(Response(errors[401].authRequired));

	try {
		const { id = undefined } = req.params;
		const {
			payment_id = undefined,
			signature = undefined
		} = req.body;

		if (!id)
			return res.status(400).send(Response(errors[400].orderIdRequired));

		const order = await rpFetchOrderById(id);
		if (!order)
			return res.status(404).send(Response(errors[404].orderNotFound));

		const receipt = await Receipt.create({
			order_id: id,
			order_details: {
				amount: order.amount,
				currency: order.currency,
				receipt_number: order.receipt,
			},
			payment_id,
			payment_signature: signature,
			user_id: res.locals.user._id,
		});

		if (!res.locals.data)
			res.locals.data = {};
		res.locals.data.receipt = receipt;
		res.locals.status = 201;
	} catch (error) {
		const { status, message } = getError(error);
		return res.status(status).send(Response(message));
	}

	return next();
}

module.exports = {
	paymentCreateOrderController,
	paymentSubmitOrderReceiptController,
};
