// Imports
const queryConfig = require("../configs/query.config.json");
const errors = require("../configs/error.codes.json");
const Submission = require("../models/Submission");
const Event = require("../models/Event");
const User = require("../models/User");
const Response = require("../models/standard.response.model");
const { errorHandler } = require("../utils/utils");

// Body
async function submissionGetController(req, res, next) {
	try {
		const { params } = req;

		const { id } = params;

		const submission = await Submission.findById(id);
		if (!submission)
			return res.status(404).send(Response(errors[404].submissionNotFound));

		if (!res.locals.data)
			res.locals.data = {};
		res.locals.data.submission = await submission.getPopulated();
	} catch (error) {
		const { status, message } = errorHandler(error);
		return res.status(status).send(Response(message));
	}

	return next();
}

async function submissionGetAllController(req, res, next) {
	try {
		const { query } = req;

		let {
			pageSize = queryConfig["search.pagination"]["page.size"],
			paginationTs = Date.now(),
		} = query;

		let submissions = await Submission.find({
			// ...query,
			last_modified: { $lte: paginationTs },
		})
			.sort({ last_modified: -1 })
			.limit(pageSize + 1);

		if (!res.locals.data)
			res.locals.data = {};
		res.locals.data.pageSize = pageSize;
		res.locals.data.resultsSize = (submissions.length === pageSize + 1 ? pageSize : submissions.length);
		res.locals.data.paginationTs = (submissions.length - 1 === pageSize ? submissions[submissions.length - 1].last_modified : null);
		res.locals.data.results = await Promise.all(submissions.copyWithin(0, 0, submissions.length - 1).map(submission => submission.getPopulated()));
	} catch (error) {
		const { status, message } = errorHandler(error);
		return res.status(status).send(Response(message));
	}

	return next();
}

async function submissionGetByEventController(req, res, next) {
	try {
		const { params, query } = req;

		const { id } = params;
		let {
			pageSize = queryConfig["search.pagination"]["page.size"],
			paginationTs = Date.now(),
		} = query;

		const event = await Event.findById(id);
		if (!event)
			return res.status(404).send(Response(errors[404].eventNotFound));

		let submissions = await Submission.find({
			event: event._id,
			last_modified: { $lte: paginationTs },
		})
			.sort({ last_modified: -1 })
			.limit(pageSize + 1);

		if (!res.locals.data)
			res.locals.data = {};
		res.locals.data.pageSize = pageSize;
		res.locals.data.resultsSize = (submissions.length === pageSize + 1 ? pageSize : submissions.length);
		res.locals.data.paginationTs = (submissions.length - 1 === pageSize ? submissions[submissions.length - 1].last_modified : null);
		res.locals.data.results = await Promise.all(submissions.copyWithin(0, 0, submissions.length - 1).map(submission => submission.getPopulated()));
	} catch (error) {
		const { status, message } = errorHandler(error);
		return res.status(status).send(Response(message));
	}

	return next();
}

async function submissionGetByUserController(req, res, next) {
	try {
		const { params, query } = req;

		const { id } = params;
		let {
			pageSize = queryConfig["search.pagination"]["page.size"],
			paginationTs = Date.now(),
		} = query;

		const user = await User.findById(id);
		if (!user)
			return res.status(404).send(Response(errors[404].userNotFound));

		let submissions = await Submission.find({
			user: user._id,
			last_modified: { $lte: paginationTs },
		})
			.sort({ last_modified: -1 })
			.limit(pageSize + 1);

		if (!res.locals.data)
			res.locals.data = {};
		res.locals.data.pageSize = pageSize;
		res.locals.data.resultsSize = (submissions.length === pageSize + 1 ? pageSize : submissions.length);
		res.locals.data.paginationTs = (submissions.length - 1 === pageSize ? submissions[submissions.length - 1].last_modified : null);
		res.locals.data.results = await Promise.all(submissions.copyWithin(0, 0, submissions.length - 1).map(submission => submission.getPopulated()));
	} catch (error) {
		const { status, message } = errorHandler(error);
		return res.status(status).send(Response(message));
	}

	return next();
}

async function submissionCreateController(req, res, next) {
	if (!res.locals.user)
		return res.status(401).send(Response(errors[401].authRequired));

	try {
		const { body } = req;

		const { event_id = undefined, links = undefined, notes = undefined, team_id = undefined } = body;

		const submission = await Submission.create({
			event: event_id,
			user: res.locals.user._id,
			team: team_id,
			links,
			notes,
		});

		if (!res.locals.data)
			res.locals.data = {};
		res.locals.data.submission = await submission.getPopulated();
		res.locals.status = 201;
	} catch (error) {
		const { status, message } = errorHandler(error, errors[400].submissionAlreadyExists);
		return res.status(status).send(Response(message));
	}

	return next();
}

async function submissionUpdateController(req, res, next) {
	if (!res.locals.user)
		return res.status(401).send(Response(errors[401].authRequired));

	try {
		const { params, body } = req;

		const { id } = params;
		const { links = undefined, notes = undefined } = body;

		const submission = await Submission.findById(id);
		if (!submission)
			return res.status(404).send(Response(errors[404].submissionNotFound));

		if (String(submission.user) !== String(res.locals.user._id))
			return res.status(403).send(Response(errors[403].invalidOperation));

		if (links !== undefined)
			submission.links = links;
		if (notes !== undefined)
			submission.notes = notes;
		submission.last_modified = Date.now();

		await submission.save();

		if (!res.locals.data)
			res.locals.data = {};
		res.locals.data.submission = await submission.getPopulated();
	} catch (error) {
		const { status, message } = errorHandler(error);
		return res.status(status).send(Response(message));
	}

	return next();
}

async function submissionDeleteController(req, res, next) {
	if (!res.locals.user)
		return res.status(401).send(Response(errors[401].authRequired));

	try {
		const { params } = req;

		const { id } = params;

		const submission = await Submission.findById(id);
		if (!submission)
			return res.status(404).send(Response(errors[404].submissionNotFound));

		if (String(submission.user) !== String(res.locals.user._id))
			return res.status(403).send(Response(errors[403].invalidOperation));

		await Submission.deleteOne({ _id: id });
	} catch (error) {
		const { status, message } = errorHandler(error);
		return res.status(status).send(Response(message));
	}

	return next();
}

module.exports = {
	submissionGetController,
	submissionGetAllController,
	submissionGetByEventController,
	submissionGetByUserController,
	submissionCreateController,
	submissionUpdateController,
	submissionDeleteController,
};
