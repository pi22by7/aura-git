// Imports
const express = require("express");
const { requireVerifiedAuth } = require("../middleware/authMiddleware");
const { complete } = require("../controllers/controllers");
const {
	receiptGetAllController,
	receiptGetByCurrentUserController,
	receiptGetByIdController,
	receiptGetByEventController,
	receiptGetByEventAndCurrentUserController,
	receiptGetByTeamController,
	receiptGetStatsParticipationController,
	receiptGetStatsGitParticipationController,
	receiptCreateController,
	receiptUpdateController,
} = require("../controllers/receiptController");

// Constants
const Router = express.Router();

// Body
Router.get("/", receiptGetAllController, complete);
Router.get("/me", requireVerifiedAuth, receiptGetByCurrentUserController, complete);
Router.get("/:id", receiptGetByIdController, complete);

Router.get("/event/:id", receiptGetByEventController, complete);
Router.get("/event/:id/me", requireVerifiedAuth, receiptGetByEventAndCurrentUserController, complete);

Router.get("/team/:id", receiptGetByTeamController, complete);

Router.get("/stats/participation", receiptGetStatsParticipationController, complete);
Router.get("/stats/participation/git", receiptGetStatsGitParticipationController, complete);

Router.post("/", requireVerifiedAuth, receiptCreateController, complete);

Router.patch("/:id", requireVerifiedAuth, receiptUpdateController, complete);

module.exports = Router;
