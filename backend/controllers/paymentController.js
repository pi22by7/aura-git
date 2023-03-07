// Imports
const errors = require("../configs/error.codes.json");
const { razorpay: razorpayConfig } = require("../configs/utils.config.json");
const Response = require("../models/standard.response.model");
const Receipt = require("../models/Receipt");
const Event = require("../models/Event");
const Team = require("../models/Team");
const { errorHandler } = require("../utils/utils");
const { rpCreateOrderByScheme, rpFetchOrderById, rpFetchPaymentById } = require("../utils/razorpay.util");

// Body
async function paymentCreateOrderController(req, res, next) {
	if (!res.locals.user)
		return res.status(401).send(Response(errors[401].authRequired));

	try {
		const { event_id } = req.query;

		// `event_id`
		if (!event_id)
			return res.status(400).send(Response(errors[400].eventIdRequired));

		// Get event
		const event = await Event.findById(event_id);
		if (!event)
			return res.status(404).send(Response(errors[404].eventNotFound));

		// Check if user has registered for the event
		const team = event.registered_teams.find(team => String(team.leader_id) === String(res.locals.user._id));
		if (!team)
			return res.status(403).send(Response(errors[403].teamNotRegistered));

		const team_doc = await Team.findById(team.team_id);
		if (!team_doc)
			return res.status(404).send(Response(errors[404].teamNotFound));

		// Validate team size
		if (team_doc.team_members.length < event.min_team_size - 1)
			return res.status(403).send(Response(errors[403].minTeamCount));

		// Check if user has already made the payment
		if (team.payment.status || await Receipt.findOne({ user_id: res.locals.user._id, event_id }))
			return res.status(400).send(Response(errors[400].alreadyPaid));

		// Get scheme
		let scheme;
		if (event.team_size === 1)
			// Solo
			scheme = razorpayConfig["available.schemes"].solo_event_registration;
		else
			// Team
			scheme = razorpayConfig["available.schemes"].team_event_registration;

		const order = await rpCreateOrderByScheme(scheme, {
			user: String(res.locals.user._id),
			event: String(event._id),
		});
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

		// Fetch order
		const order = await rpFetchOrderById(id);
		if (!order)
			return res.status(404).send(Response(errors[404].orderNotFound));

		// Check if the order belongs to correct user
		if (order.notes.user !== String(res.locals.user._id))
			return res.status(403).send(Response(errors[403].invalidOperation));

		// Check that `amount_paid` is equal to `amount`, and that `amount_due` is zero
		if (order.amount_paid !== order.amount || order.amount_due !== 0)
			return res.status(403).send(Response(errors[403].incompletePayment));

		// Fetch payment and check if payment is made
		const payment = await rpFetchPaymentById(payment_id);
		if (!payment)
			return res.status(403).send(Response(errors[403].incompletePayment));
		if (payment.order_id !== id)
			return res.status(400).send(Response(errors[400].receiptOrderMismatch));

		// Store receipt
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
			event_id: order.notes.event,
		});

		// Reference receipt and update status in event document
		const event = await Event.findById(order.notes.event);

		const index = event.registered_teams.findIndex(team => String(team.leader_id) === String(res.locals.user._id));
		if (index === -1)
			return res.status(403).send(Response(errors[403].teamNotRegistered));

		const update = { $set: {} };
		update.$set[`registered_teams.${index}.payment`] = {
			status: true,
			receipt_id: receipt._id,
		};
		const results = await Event.updateOne({ _id: event._id }, update);
		if (results.modifiedCount === 0)
			return res.status(500).send(Response(errors[500]));

		// Reference receipt in user document
		res.locals.user.paid_for.push({
			event_id: order.notes.event,
			receipt_id: receipt._id,
		});
		await res.locals.user.save();
		await res.locals.refreshProfile();

		if (!res.locals.data)
			res.locals.data = {};
		res.locals.data.receipt = receipt;
		res.locals.status = 201;
	} catch (error) {
		const { status, message } = errorHandler(error, errors[400].alreadyPaid);
		return res.status(status).send(Response(message));
	}

	return next();
}

module.exports = {
	paymentCreateOrderController,
	paymentSubmitOrderReceiptController,
};
