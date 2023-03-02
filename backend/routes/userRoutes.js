// Imports
const express = require("express");
const { complete } = require("../controllers/controllers");
const { userGetController, userSearchController } = require("../controllers/userController");

// Constants
const Router = express.Router();

// Body
Router.get("/search", userSearchController, complete);
Router.get("/:id", userGetController, complete);

module.exports = Router;
