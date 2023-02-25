// Imports
const express = require("express");
const { requireAuth } = require("../middleware/authMiddleware");
const {
	ticketCreateEmailVerificationController,
	ticketResolveEmailVerificationController,
	ticketCreatePasswordResetController,
	ticketResolvePasswordResetController,
} = require("../controllers/ticketController");

// Constants
const Router = express.Router();

// Body
Router.get("/verification/email", requireAuth, ticketCreateEmailVerificationController);
Router.get("/verification/email/resolve", requireAuth, ticketResolveEmailVerificationController);

Router.post("/verification/password", requireAuth, ticketCreatePasswordResetController);
Router.get("/verification/password/resolve", requireAuth, ticketResolvePasswordResetController);

module.exports = Router;
