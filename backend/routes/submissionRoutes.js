// Imports
const express = require("express");
const { requireVerifiedAuth } = require("../middleware/authMiddleware");
const { complete } = require("../controllers/controllers");
const {
	submissionGetController,
	submissionGetAllController,
	submissionGetByEventController,
	submissionGetByUserController,
	submissionCreateController,
	submissionUpdateController,
	submissionDeleteController,
} = require("../controllers/submissionController");

// Constants
const Router = express.Router();

// Body
Router.get("/:id", submissionGetController, complete);
Router.get("/", submissionGetAllController, complete);
Router.get("/event/:id", submissionGetByEventController, complete);
Router.get("/user/:id", submissionGetByUserController, complete);

Router.post("/", requireVerifiedAuth, submissionCreateController, complete);

Router.patch("/:id", requireVerifiedAuth, submissionUpdateController, complete);

Router.delete("/:id", requireVerifiedAuth, submissionDeleteController, complete);

module.exports = Router;
