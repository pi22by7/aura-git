const { Router } = require("express");
const eventController = require("../controllers/eventController");

const router = Router();

router.get("/details/:id", eventController.event_get);
router.get("/allEvents", eventController.allevent_get);

//
module.exports = router;
