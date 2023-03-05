// Imports
const express = require("express");
const { requireVerifiedAuth } = require("../middleware/authMiddleware");
const { complete } = require("../controllers/controllers");
const {
	paymentCreateOrderController,
	paymentSubmitOrderReceiptController,
} = require("../controllers/paymentController");

// Constants
const Router = express.Router();

// Body
Router.get("/order", requireVerifiedAuth, paymentCreateOrderController, complete);
Router.post("/order/:id/receipt", requireVerifiedAuth, paymentSubmitOrderReceiptController, complete);

module.exports = Router;
