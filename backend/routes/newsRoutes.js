// Imports
const express = require("express");
const { complete, outOfOrder } = require("../controllers/controllers");
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

Router.post("/", outOfOrder);

Router.patch("/:id", outOfOrder);

Router.delete("/:id", outOfOrder);

module.exports = Router;
