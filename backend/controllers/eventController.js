// Imports
const errors = require("../configs/error.codes.json");
const eventConfig = require("../configs/event.config.json");
const Event = require("../models/Event");
const Response = require("../models/standard.response.model");
const { errorHandler } = require("../utils/utils");

// Body
module.exports.eventGetAllController = async (req, res, next) => {
  try {
    const events = await Event.aggregate([
      {
        $match: {
          kind: "event",
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
    res.locals.data.events = events;
  } catch (error) {
    const { status, message } = errorHandler(error);
    return res.status(status).send(Response(message));
  }

  return next();
};

module.exports.eventGetByClubController = async (req, res, next) => {
  try {
    const { club } = req.params;

    const events = await Event.find({ "_slugs.club": club, kind: eventConfig.kinds.event });

    if (events.length === 0)
      return res.status(404).send(Response(errors[404].clubNotFound));

    if (!res.locals.data)
      res.locals.data = {};
    res.locals.data.events = events;
  } catch (error) {
    const { status, message } = errorHandler(error);
    return res.status(status).send(Response(message));
  }

  return next();
};

module.exports.eventGetByClubAndTitleController = async (req, res, next) => {
  try {
    const { club, title } = req.params;

    const event = await Event.findOne({ "_slugs.club": club, "_slugs.title": title, kind: eventConfig.kinds.event });
    if (!event)
      return res.status(404).send(Response(errors[404].eventNotFound));

    if (!res.locals.data)
      res.locals.data = {};
    res.locals.data.event = event;
  } catch (error) {
    const { status, message } = errorHandler(error);
    return res.status(status).send(Response(message));
  }

  return next();
};
