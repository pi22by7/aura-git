// Imports
const express = require("express");
const { checkUser } = require("../middleware/authMiddleware");
const {
	ticketCreateEmailVerificationController,
	ticketResolveEmailVerificationController,
	ticketCreatePasswordResetController,
	ticketResolvePasswordResetController,
} = require("../controllers/ticketController");

// Constants
const Router = express.Router();

// Body
Router.get("/verification/email", checkUser, ticketCreateEmailVerificationController);
Router.get("/verification/email/resolve", checkUser, ticketResolveEmailVerificationController);

Router.post("/verification/password", checkUser, ticketCreatePasswordResetController);
Router.get("/verification/password/resolve", checkUser, ticketResolvePasswordResetController);

module.exports = Router;
