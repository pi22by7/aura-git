// Imports
const express = require("express");
const { complete } = require("../controllers/controllers");
const {
	ticketCreateEmailVerificationController,
	ticketResolveEmailVerificationController,
	ticketCreatePasswordResetController,
	ticketResolvePasswordResetController,
} = require("../controllers/ticketController");

// Constants
const Router = express.Router();

// Body
Router.get("/verification/email", ticketCreateEmailVerificationController, complete);
Router.get("/verification/email/resolve", ticketResolveEmailVerificationController, complete);

Router.post("/verification/password", ticketCreatePasswordResetController, complete);
Router.get("/verification/password/resolve", ticketResolvePasswordResetController, complete);

module.exports = Router;
