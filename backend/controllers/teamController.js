// Imports
const Team = require("../models/Team");
const User = require("../models/User");
const errors = require("../configs/error.codes.json");
const Response = require("../models/standard.response.model");

// Body
// Create a new team
module.exports.createTeam = async (req, res, next) => {
	if (!res.locals.user)
		return res.status(401).send(Response(errors[401].authRequired));

	try {
		const { body } = req;
		if (!("event_participated" in body))
			return res.status(400).send(Response(errors[400].eventDetailsRequired));
		if (!("team_name" in body))
			return res.status(400).send(Response(errors[400].teamNameRequired));

		let { event_participated, team_name, team_members = [] } = req.body;
		
		// Check if team members contains leader
		if (team_members.find(id => id === String(res.locals.user._id)))
			return res.status(403).send(Response(errors[403].invalidOperation));
		
		team_members = await Promise.all(team_members.map(id => User.findById(id)));
		if (team_members.length > 0 && team_members.find(member => !member))
			return res.status(404).send(Response(errors[404].userNotFound));

		// Check if the user is already registered for the current event
		let results = await Team.find({
			$or: [{
				"team_leader.id": res.locals.user._id,
			}, {
				"team_members.id": res.locals.user._id,
			}],
		});
		if (results.length > 0)
			// Already registered for the event
			return res.status(403).send(Response(errors[403].eventAlreadyRegistered));

		const orFields = [];
		team_members.forEach(member => {
			orFields.push({
				"team_leader.id": member._id,
			});
			orFields.push({
				team_members: { $elemMatch: { email: member.email } },
			});
		});
		if (team_members.length > 0) {
			// Check if at least one team member has already registered
			results = await Team.find({
				$or: orFields,
			});
			if (results.length > 0)
				// Already registered for the event
				return res.status(403).send(Response(errors[403].teamMemberAlreadyRegistered));
		}

		// Register team
		const newTeam = await Team.create({
			event_participated,
			team_name,
			team_leader: {
				id: res.locals.user._id,
				usn: res.locals.user.usn,
				name: res.locals.user.name,
				email: res.locals.user.email,
			},
			team_members: team_members.map(member => ({
				id: member._id,
				email: member.email,
				name: member.name,
				usn: member.usn,
			})),
		});

		if (!res.locals.data)
			res.locals.data = {};
		res.locals.data.team = newTeam;
		res.locals.status = 201;
	} catch (err) {
		console.error("[teamController]", err);

		if ("message" in err) {
			if (err.message.includes("validation failed"))
				return res.status(400).send(Response(Object.values(err.errors)[0].properties.message));
			return res.status(500).json(Response(err.message));
		}
		return res.status(500).send(Response(errors[500]));
	}

	return next();
};

// Fetch all teams under the a specific event
module.exports.fetchTeams = async (req, res, next) => {
	try {
		const { id } = req.params;

		if (!res.locals.data)
			res.locals.data = {};
		res.locals.data.teams = await Team.find({ "event_participated.event_id": id });
	} catch (err) {
		console.error("[teamController]", err);

		if ("message" in err)
			return res.status(500).json(Response(err.message));
		return res.status(500).send(Response(errors[500]));
	}

	return next();
};
