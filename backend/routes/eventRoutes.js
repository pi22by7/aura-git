const { Router } = require("express");
const { complete } = require("../controllers/controllers");
const eventController = require("../controllers/eventController");
const { checkUser } = require("../middleware/authMiddleware");

const router = Router();

router.get("/", checkUser, eventController.allevent_get, complete);
router.get("/:id", checkUser, eventController.event_get, complete);

//
module.exports = router;
