const { Router } = require("express");
const teamController = require("../controllers/teamController");

const router = Router();

router.get("/event/:id", teamController.fetchTeams);
router.post("/createteam", teamController.createTeam);

module.exports = router;
