// Imports
const errors = require("../configs/error.codes.json");
const eventConfig = require("../configs/event.config.json");
const Event = require("../models/Event");
const Response = require("../models/standard.response.model");
const { errorHandler } = require("../utils/utils");

// Body
module.exports.eventGetAllGroupedController = async (req, res, next) => {
  try {
    const { kind = eventConfig.kinds.event } = req.query;
    if (!Object.values(eventConfig.kinds).includes(kind))
      return res.status(400).send(Response(errors[400].invalidKind));

    const records = await Event.aggregate([
      {
        $match: {
          kind: kind,
        },
      },
      {
        $group: {
          _id: "$club",
          events: {
            $push: "$$ROOT",
          },
        },
      },
      {
        $unwind: "$events",
      },
      {
        $sort: {
          "events.title": 1,
        },
      },
      {
        $group: {
          _id: "$_id",
          events: {
            $push: "$events",
          },
        },
      },
    ]);

    if (!res.locals.data)
      res.locals.data = {};
    if (kind === eventConfig.kinds.event)
      res.locals.data.events = records;
    else if (kind === eventConfig.kinds.rulebook)
      res.locals.data.rulebooks = records;
  } catch (error) {
    const { status, message } = errorHandler(error);
    return res.status(status).send(Response(message));
  }

  return next();
};

module.exports.eventGetAllController = async (req, res, next) => {
  try {
    const { kind = eventConfig.kinds.event } = req.query;
    if (!Object.values(eventConfig.kinds).includes(kind))
      return res.status(400).send(Response(errors[400].invalidKind));

    const records = await Event.find({ kind });

    if (!res.locals.data)
      res.locals.data = {};
    if (kind === eventConfig.kinds.event)
      res.locals.data.events = records;
    else if (kind === eventConfig.kinds.rulebook)
      res.locals.data.rulebooks = records;
  } catch (error) {
    const { status, message } = errorHandler(error);
    return res.status(status).send(Response(message));
  }

  return next();
};

module.exports.eventGetByClubController = async (req, res, next) => {
  try {
    const { club } = req.params;
    const { kind = eventConfig.kinds.event } = req.query;
    if (!Object.values(eventConfig.kinds).includes(kind))
      return res.status(400).send(Response(errors[400].invalidKind));

    const records = await Event.find({ "_slugs.club": club, kind });

    if (records.length === 0)
      return res.status(404).send(Response(errors[404].clubNotFound));

    if (!res.locals.data)
      res.locals.data = {};
    if (kind === eventConfig.kinds.event)
      res.locals.data.events = records;
    else if (kind === eventConfig.kinds.rulebook)
      res.locals.data.rulebooks = records;
  } catch (error) {
    const { status, message } = errorHandler(error);
    return res.status(status).send(Response(message));
  }

  return next();
};

module.exports.eventGetByClubAndTitleController = async (req, res, next) => {
  try {
    const { club, title } = req.params;

    const record = await Event.findOne({ "_slugs.club": club, "_slugs.title": title });
    if (!record)
      return res.status(404).send(Response(errors[404].eventNotFound));

    if (!res.locals.data)
      res.locals.data = {};
    if (record.kind === eventConfig.kinds.event)
      res.locals.data.event = record;
    else if (record.kind === eventConfig.kinds.rulebook)
      res.locals.data.rulebook = record;
  } catch (error) {
    const { status, message } = errorHandler(error);
    return res.status(status).send(Response(message));
  }

  return next();
};

module.exports.eventGetByIdController = async (req, res, next) => {
  try {
    const { params } = req;

    const { id } = params;

    const record = await Event.findById(id);
    if (!record)
      return res.status(404).send(Response(errors[404].eventNotFound));

    if (!res.locals.data)
      res.locals.data = {};
    if (record.kind === eventConfig.kinds.event)
      res.locals.data.event = record;
    else if (record.kind === eventConfig.kinds.rulebook)
      res.locals.data.rulebook = record;
  } catch (error) {
    const { status, message } = errorHandler(error);
    return res.status(status).send(Response(message));
  }

  return next();
};
