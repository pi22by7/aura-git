// Imports
const { Router } = require("express");
const { complete } = require("../controllers/controllers");
const {
	eventGetAllGroupedController,
	eventGetAllController,
	eventGetByClubController,
	eventGetByClubAndTitleController,
	eventGetByIdController,
} = require("../controllers/eventController");
const { checkUser } = require("../middleware/authMiddleware");

// Constants
const router = Router();

// Body
router.get("/", checkUser, eventGetAllGroupedController, complete);
router.get("/list", checkUser, eventGetAllController, complete);

router.get("/resolve/:id", checkUser, eventGetByIdController, complete);

router.get("/:club", checkUser, eventGetByClubController, complete);
router.get("/:club/:title", checkUser, eventGetByClubAndTitleController, complete);

module.exports = router;
