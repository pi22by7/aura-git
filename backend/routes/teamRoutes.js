const { Router } = require("express");
const { complete } = require("../controllers/controllers");
const teamController = require("../controllers/teamController");
const { checkUser, requireVerifiedAuth } = require("../middleware/authMiddleware");

const router = Router();

router.get("/event/:id", checkUser, teamController.fetchTeams, complete);
router.post("/createteam", requireVerifiedAuth, teamController.createTeam, complete);

module.exports = router;
