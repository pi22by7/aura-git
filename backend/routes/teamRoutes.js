const { Router } = require("express");
const teamController = require("../controllers/teamController");
const { requireVerifiedAuth } = require("../middleware/authMiddleware");

const router = Router();

router.get("/event/:id", teamController.fetchTeams);
router.post("/createteam", requireVerifiedAuth, teamController.createTeam);

module.exports = router;
