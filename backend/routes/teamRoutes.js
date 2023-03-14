// Imports
const { Router } = require("express");
const { complete, outOfOrder } = require("../controllers/controllers");
const teamController = require("../controllers/teamController");
const { checkUser, requireVerifiedAuth } = require("../middleware/authMiddleware");

// Constants
const router = Router();

// Body
router.get("/", teamController.fetchAll, complete);
router.get("/:id", teamController.fetchById, complete);

router.get("/event/:id", checkUser, teamController.fetchByEvent, complete);
router.get("/event/:id/complete", teamController.fetchCompleteByEvent, complete);
router.get("/event/:id/paid", checkUser, teamController.fetchPaidTeamsByEvent, complete);
router.get("/event/:id/unpaid", checkUser, teamController.fetchUnpaidTeamsByEvent, complete);

router.get("/user/:id", checkUser, teamController.fetchByUser, complete);

router.get("/stats/paid", teamController.statsPaidTeams, complete);
router.get("/stats/unpaid", teamController.statsUnpaidTeams, complete);

router.post("/createteam", requireVerifiedAuth, teamController.createTeam, complete);

router.patch("/:id", requireVerifiedAuth, teamController.modifyTeam, complete);

// router.delete("/:id", requireVerifiedAuth, teamController.deleteTeam, complete);
router.delete("/:id", outOfOrder);

module.exports = router;
