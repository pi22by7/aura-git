// Imports
const { isEmail } = require("validator");
const errors = require("../configs/error.codes.json");
const ticketConfig = require("../configs/ticket.config.json");
const Ticket = require("../models/Ticket");
const User = require("../models/User");
const Response = require("../models/standard.response.model");
const { jwtDecoded, bcryptHash, errorHandler } = require("../utils/utils");

// Body
async function ticketCreateEmailVerificationController(req, res, next) {
	try {
		const { query } = req;

		const { email = undefined } = query;

		if (email === undefined)
			return res.status(400).send(Response(errors[400].emailRequired));
		if (!isEmail(email))
			return res.status(400).send(Response(errors[400].invalidEmail));

		const user = await User.findOne({ email });
		if (!user)
			return res.status(400).send(Response(errors[404].userNotFound));

		const code = await user.createNewTicket(ticketConfig.purposes.EMAIL_VERIFICATION);

		// Email is already verified
		if (code === 0)
			return res.status(400).send(Response(errors[400].alreadyVerified));

		// Email is already sent
		if (code === 1)
			return res.status(400).send(Response(errors[400].emailAlreadySent));

		// Handle unknown errors
		if (code !== 2)
			return res.status(500).send(Response(errors[500]));

		// Email ticket created
		res.locals.status = 201;
	} catch (error) {
		const { status, message } = errorHandler(error);
		return res.status(status).send(Response(message));
	}

	return next();
}

async function ticketResolveEmailVerificationController(req, res, next) {
	try {
		const { query } = req;

		// `token`
		if (!("token" in query))
			return res.status(400).send(Response(errors[400].tokenRequired));
		const { id, user_id } = await jwtDecoded(query.token);

		// Get user
		const user = await User.findById(user_id);
		if (!user)
			return res.status(404).send(Response(errors[404].userNotFound));

		// Validate user
		if (user.email_verified)
			return res.status(400).send(Response(errors[400].alreadyVerified));
		if (String(user.tickets[ticketConfig.user_tickets_fields.email_verification]) !== id)
			return res.status(404).send(Response(errors[404].ticketNotFound));

		// Fetch ticket
		const ticket = await Ticket.findOne({ _id: id, user_id: user_id, purpose: ticketConfig.purposes.EMAIL_VERIFICATION });
		if (!ticket)
			return res.status(404).send(Response(errors[404].ticketNotFound));

		// Resolve ticket
		await Ticket.deleteOne({ _id: ticket._id });

		user.email_verified = true;
		user.tickets[ticketConfig.user_tickets_fields.email_verification] = null;
		await user.save();
	} catch (error) {
		const { status, message } = errorHandler(error);
		return res.status(status).send(Response(message));
	}

	return next();
}

async function ticketCreatePasswordResetController(req, res, next) {
	try {
		const { body, query } = req;

		const { email = undefined } = query;
		if (!email)
			return res.status(400).send(Response(errors[400].emailRequired));

		const { new_password = undefined } = body;
		if (!new_password)
			return res.status(400).send(Response(errors[400].newPasswordRequired));
		if (new_password.length < 6)
			return res.status(400).send(Response(errors[400].shortPassword));

		const user = await User.findOne({ email });
		if (!user)
			return res.status(404).send(Response(errors[404].userNotFound));
		const code = await user.createNewTicket(ticketConfig.purposes.PASSWORD_RESET, { new_password: await bcryptHash(new_password) });

		// Email is already sent
		if (code === 1)
			return res.status(400).send(Response(errors[400].emailAlreadySent));

		// Handle unknown errors
		if (code !== 2)
			return res.status(500).send(Response(errors[500]));

		// Password reset ticket created
		res.locals.status = 201;
	} catch (error) {
		const { status, message } = errorHandler(error);
		return res.status(status).send(Response(message));
	}

	return next();
}

async function ticketResolvePasswordResetController(req, res, next) {
	try {
		const { query } = req;

		// `target`
		const { target = undefined } = query;
		if (!target)
			return res.status(400).send(Response(errors[400].idRequired));

		// `token`
		const { token = undefined } = query;
		if (!token)
			return res.status(400).send(Response(errors[400].tokenRequired));
		const { id, user_id } = await jwtDecoded(token);

		if (target !== user_id)
			return res.status(400).send(Response(errors[400].invalidRequest));

		// `dismiss`
		let dismiss = false;
		if ("dismiss" in query && query.dismiss === "true")
			dismiss = true;

		// Fetch user
		const user = await User.findOne({ _id: target });
		if (!user)
			return res.status(404).send(Response(errors[404].userNotFound));

		// Validate user
		if (String(user._id) !== user_id)
			return res.status(400).send(Response(errors[400].invalidRequest));
		if (String(user.tickets[ticketConfig.user_tickets_fields.password_reset]) !== id)
			return res.status(404).send(Response(errors[404].ticketNotFound));

		// Fetch ticket
		const ticket = await Ticket.findOne({ _id: id, user_id: user._id, purpose: ticketConfig.purposes.PASSWORD_RESET });
		if (!ticket)
			return res.status(404).send(Response(errors[404].ticketNotFound));

		// If dismissed, remove the ticket
		if (dismiss) {
			user.tickets[ticketConfig.user_tickets_fields.password_reset] = null;
			await user.save();
			await Ticket.deleteOne({ _id: ticket._id });

			return next();
		}

		// Else, continue with password reset
		const { new_password } = ticket.data;

		// Resolve ticket
		user.password = new_password;
		user._profile_information.last_password_reset = Date.now();
		user.tickets[ticketConfig.user_tickets_fields.password_reset] = null;
		await user.save();
		await Ticket.deleteOne({ _id: ticket._id });
	} catch (error) {
		const { status, message } = errorHandler(error);
		return res.status(status).send(Response(message));
	}

	return next();
}

module.exports = {
	ticketCreateEmailVerificationController,
	ticketResolveEmailVerificationController,
	ticketCreatePasswordResetController,
	ticketResolvePasswordResetController,
};
