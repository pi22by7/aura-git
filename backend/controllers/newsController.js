// Imports
const errors = require("../configs/error.codes.json");
const queryConfig = require("../configs/query.config.json");
const Response = require("../models/standard.response.model");
const News = require("../models/News");
const { errorHandler } = require("../utils/utils");

// Body
async function newsGetAllController(req, res, next) {
	try {
		const { query } = req;

		let {
			pageSize = queryConfig["search.pagination"]["page.size"],
			paginationTs = Date.now(),
		} = query;
		pageSize = parseInt(pageSize, 10);
		paginationTs = parseInt(paginationTs, 10);

		if (typeof pageSize === "string")
			pageSize = parseInt(pageSize, 10);
		if (pageSize <= 0 || pageSize > queryConfig["search.pagination"]["page.max.size"])
			pageSize = queryConfig["search.pagination"]["page.size"];

		const news = await News.find({
			posted_at: { $lte: paginationTs },
		})
			.sort({ posted_at: -1 })
			.limit(pageSize + 1);

		if (!res.locals.data)
			res.locals.data = {};
		res.locals.data.pageSize = pageSize;
		res.locals.data.resultsSize = (news.length === pageSize + 1 ? pageSize : news.length);
		res.locals.data.paginationTs = (news.length - 1 === pageSize ? news[news.length - 1].posted_at : null);
		res.locals.data.results = news.copyWithin(0, 0, news.length - 1);
	} catch (error) {
		const { status, message } = errorHandler(error);
		return res.status(status).send(Response(message));
	}

	return next();
}

async function newsGetByIdController(req, res, next) {
	try {
		const { params } = req;

		const { id } = params;

		const news = await News.findById(id);
		if (!news)
			return res.status(404).send(Response(errors[404].newsNotFound));

		if (!res.locals.data)
			res.locals.data = {};
		res.locals.data.news = news;
	} catch (error) {
		const { status, message } = errorHandler(error);
		return res.status(status).send(Response(message));
	}

	return next();
}

async function newsCreateController(req, res, next) {
	try {
		const { body } = req;

		const { content = undefined } = body;

		if (!res.locals.data)
			res.locals.data = {};
		res.locals.data.news = await News.create({
			content,
		});
	} catch (error) {
		const { status, message } = errorHandler(error);
		return res.status(status).send(Response(message));
	}

	return next();
}

async function newsUpdateController(req, res, next) {
	try {
		const { params, body } = req;

		const { id } = params;
		const { content = undefined } = body;

		const news = await News.findById(id);
		if (!news)
			return res.status(404).send(Response(errors[404].newsNotFound));

		if (content)
			news.content = content;
		news.edited_at = Date.now();

		await news.save();

		if (!res.locals.data)
			res.locals.data = {};
		res.locals.data.news = news;
	} catch (error) {
		const { status, message } = errorHandler(error);
		return res.status(status).send(Response(message));
	}

	return next();
}

async function newsDeleteByIdController(req, res, next) {
	try {
		const { params } = req;

		const { id } = params;

		const news = await News.findById(id);
		if (!news)
			return res.status(404).send(Response(errors[404].newsNotFound));

		await News.deleteOne({ _id: id });
	} catch (error) {
		const { status, message } = errorHandler(error);
		return res.status(status).send(Response(message));
	}

	return next();
}

module.exports = {
	newsGetAllController,
	newsGetByIdController,
	newsCreateController,
	newsUpdateController,
	newsDeleteByIdController,
};
