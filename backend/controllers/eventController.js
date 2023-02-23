const Event = require("../models/Event");
const express = require('express');



module.exports.event_get = async (req, res) => {
    try {
        const event = await Event.findOne({ _id: req.params.id });
        res.json(event);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
module.exports.allevent_get = async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
