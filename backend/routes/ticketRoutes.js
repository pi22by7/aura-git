// Imports
const express = require("express");
const { complete } = require("../controllers/controllers");
const {
	ticketCreateEmailVerificationController,
	ticketResolveEmailVerificationController,
	ticketCreatePasswordResetController,
	ticketResolvePasswordResetController,
} = require("../controllers/ticketController");
const { requireAuth } = require("../middleware/authMiddleware");

// Constants
const Router = express.Router();

// Body
Router.get("/verification/email", requireAuth, ticketCreateEmailVerificationController, complete);
Router.get("/verification/email/resolve", requireAuth, ticketResolveEmailVerificationController, complete);

Router.post("/verification/password", requireAuth, ticketCreatePasswordResetController, complete);
Router.get("/verification/password/resolve", requireAuth, ticketResolvePasswordResetController, complete);

module.exports = Router;
