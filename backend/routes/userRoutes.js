// Imports
const express = require("express");
const { requireAuth } = require("../middleware/authMiddleware");
const { complete } = require("../controllers/controllers");
const {
	userGetController,
	userSearchController,
	userUpdateController,
} = require("../controllers/userController");

// Constants
const Router = express.Router();

// Body
Router.get("/search", userSearchController, complete);
Router.get("/:id", userGetController, complete);

Router.patch("/", requireAuth, userUpdateController, complete);

module.exports = Router;
