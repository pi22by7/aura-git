// Imports
const { Router } = require("express");
const { complete } = require("../controllers/controllers");
const teamController = require("../controllers/teamController");
const { checkUser, requireVerifiedAuth } = require("../middleware/authMiddleware");

// Constants
const router = Router();

// Body
router.get("/event/:id", checkUser, teamController.fetchByEvent, complete);
router.get("/user/:id", checkUser, teamController.fetchByUser, complete);

router.post("/createteam", requireVerifiedAuth, teamController.createTeam, complete);

router.patch("/:id", requireVerifiedAuth, teamController.modifyTeam, complete);

router.delete("/:id", requireVerifiedAuth, teamController.deleteTeam, complete);

module.exports = router;
