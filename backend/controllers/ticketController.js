// Imports
const errors = require("../configs/error.codes.json");
const ticketConfig = require("../configs/ticket.config.json");
const Ticket = require("../models/Ticket");
const Response = require("../models/standard.response.model");
const { jwtDecoded, bcryptHash } = require("../utils/utils");

// Body
async function ticketCreateEmailVerificationController(req, res, next) {
	try {
		if (!res.locals.user)
			return res.status(401).send(Response(errors[401].authRequired));
		
		const code = await res.locals.user.createNewTicket(ticketConfig.purposes.EMAIL_VERIFICATION);

		// Email is already verified
		if (code === 0)
			return res.status(400).send(Response(errors[400].alreadyVerified));
		
		// Email is already sent
		if (code === 1)
			return res.status(400).send(Response(errors[400].emailAlreadySent));
		
		// Email ticket created
		if (code === 2)
			return res.status(200).send(Response(false));
	} catch (error) {
		console.error("[ticketController]", error);

		if ("message" in error)
			return res.status(500).send(Response(error.message));
		else
			return res.status(500).send(Response(errors[500]));
	}
}

async function ticketResolveEmailVerificationController(req, res, next) {
	try {
		if (!res.locals.user)
			return res.status(401).send(Response(errors[401].authRequired));
		
		const { query } = req;
		
		// `token`
		if (!("token" in query))
			return res.status(400).send(Response(errors[400].tokenRequired));
		const { id, user_id } = await jwtDecoded(query.token);

		// Validate user
		if (String(res.locals.user._id) !== user_id)
			return res.status(400).send(Response(errors[400].invalidRequest));
		if (res.locals.user.email_verified)
			return res.status(400).send(Response(errors[400].alreadyVerified));
		if (String(res.locals.user.tickets[ticketConfig.user_tickets_fields.email_verification]) !== id)
			return res.status(404).send(Response(errors[404].ticketNotFound));
		
		// Fetch ticket
		const ticket = await Ticket.findOne({ _id: id, user_id: res.locals.user._id, purpose: ticketConfig.purposes.EMAIL_VERIFICATION });
		if (!ticket)
			return res.status(404).send(Response(errors[404].ticketNotFound));

		// Resolve ticket
		await Ticket.deleteOne({ _id: ticket._id });
		res.locals.user.email_verified = true;
		res.locals.user.tickets[ticketConfig.user_tickets_fields.email_verification] = null;
		await res.locals.user.save();

		return res.status(200).send(Response(false));
	} catch (error) {
		console.error("[ticketController]", error);

		if ("message" in error)
			return res.status(500).send(Response(error.message));
		else
			return res.status(500).send(Response(errors[500]));
	}
}

async function ticketCreatePasswordResetController(req, res, next) {
	try {
		if (!res.locals.user)
			return res.status(401).send(Response(errors[401].authRequired));
		
		const { body } = req;
		if (!("new_password" in body))
			return res.status(400).send(Response(errors[400].newPasswordRequired));
		const { new_password } = body;

		if (new_password.length < 6)
			return res.status(400).send(Response(errors[400].shortPassword));
		
		const code = await res.locals.user.createNewTicket(ticketConfig.purposes.PASSWORD_RESET, { new_password: await bcryptHash(new_password) });
		
		// Email is already sent
		if (code === 1)
			return res.status(400).send(Response(errors[400].emailAlreadySent));
		
		// Password reset ticket created
		if (code === 2)
			return res.status(200).send(Response(false));
	} catch (error) {
		console.error("[ticketController]", error);

		if ("message" in error)
			return res.status(500).send(Response(error.message));
		else
			return res.status(500).send(Response(errors[500]));
	}
}

async function ticketResolvePasswordResetController(req, res, next) {
	try {
		if (!res.locals.user)
			return res.status(401).send(Response(errors[401].authRequired));
		
		const { query } = req;
		
		// `token`
		if (!("token" in query))
			return res.status(400).send(Response(errors[400].tokenRequired));
		const { id, user_id } = await jwtDecoded(query.token);

		// `dismiss`
		let dismiss = false;
		if ("dismiss" in query && query.dismiss === "true")
			dismiss = true;

		// Validate user
		if (String(res.locals.user._id) !== user_id)
			return res.status(400).send(Response(errors[400].invalidRequest));
		if (String(res.locals.user.tickets[ticketConfig.user_tickets_fields.password_reset]) !== id)
			return res.status(404).send(Response(errors[404].ticketNotFound));
		
		// Fetch ticket
		const ticket = await Ticket.findOne({ _id: id, user_id: res.locals.user._id, purpose: ticketConfig.purposes.PASSWORD_RESET });
		if (!ticket)
			return res.status(404).send(Response(errors[404].ticketNotFound));
		
		// If dismissed, remove the ticket
		if (dismiss) {
			res.locals.user.tickets[ticketConfig.user_tickets_fields.password_reset] = null;
			await res.locals.user.save();
			await Ticket.deleteOne({ _id: ticket._id });

			return res.status(200).send(Response(false));
		}
		
		// Else, continue with password reset
		const { new_password } = ticket.data;

		// Resolve ticket
		res.locals.user.password = new_password;
		res.locals.user._profile_information.last_password_reset = Date.now();
		res.locals.user.tickets[ticketConfig.user_tickets_fields.password_reset] = null;
		await res.locals.user.save();
		await Ticket.deleteOne({ _id: ticket._id });

		return res.status(200).send(Response(false));
	} catch (error) {
		console.error("[ticketController]", error);

		if ("message" in error)
			return res.status(500).send(Response(error.message));
		else
			return res.status(500).send(Response(errors[500]));
	}
}

module.exports = {
	ticketCreateEmailVerificationController,
	ticketResolveEmailVerificationController,
	ticketCreatePasswordResetController,
	ticketResolvePasswordResetController,
};
