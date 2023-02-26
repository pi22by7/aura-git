const errors = require("../configs/error.codes.json");
const Event = require("../models/Event");
const Response = require("../models/standard.response.model");

module.exports.event_get = async (req, res, next) => {
  try {
    const event = await Event.findOne({ _id: req.params.id });
    if (!event) return res.status(404).send(Response(errors[404].eventNotFound));

    if (!res.locals.data)
      res.locals.data = {};
    res.locals.data.event = event;
  } catch (error) {
    console.error("[eventController]", error);

    if ("message" in error) return res.status(500).json(Response(error.message));
    return res.status(500).send(Response(errors[500]));
  }

  return next();
};

module.exports.allevent_get = async (req, res, next) => {
  try {
    const events = await Event.aggregate([
      {
        $group: {
          _id: "$club",
          events: {
            $push: "$$ROOT",
          },
        },
      },
    ]);

    if (!res.locals.data)
      res.locals.data = {};
    res.locals.data.events = events;
  } catch (error) {
    console.error("[eventController]", error);

    if ("message" in error) return res.status(500).json(Response(error.message));
    return res.status(500).send(Response(errors[500]));
  }

  return next();
};
