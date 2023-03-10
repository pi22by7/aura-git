// Imports
const express = require("express");
const { complete } = require("../controllers/controllers");
const {
	newsGetAllController,
	newsGetByIdController,
	newsCreateController,
	newsUpdateController,
	newsDeleteByIdController,
} = require("../controllers/newsController");

// Constants
const Router = express.Router();

// Body
Router.get("/", newsGetAllController, complete);
Router.get("/:id", newsGetByIdController, complete);

Router.post("/", newsCreateController, complete);

Router.patch("/:id", newsUpdateController, complete);

Router.delete("/:id", newsDeleteByIdController, complete);

module.exports = Router;
