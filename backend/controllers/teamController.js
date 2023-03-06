// Imports
const Team = require("../models/Team");
const User = require("../models/User");
const errors = require("../configs/error.codes.json");
const queryConfig = require("../configs/query.config.json");
const Response = require("../models/standard.response.model");
const { errorHandler } = require("../utils/utils");

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

		if (!("event_id" in event_participated))
			return res.status(400).send(Response(errors[400].eventDetailsRequired));

		// Check if team members contains leader
		if (team_members.find(aura_id => aura_id === res.locals.user.aura_id))
			return res.status(403).send(Response(errors[403].invalidOperation));

		team_members = await Promise.all(team_members.map(aura_id => User.findOne({ aura_id })));
		if (team_members.length > 0 && team_members.filter(member => member).length !== team_members.length)
			return res.status(404).send(Response(errors[404].userNotFound));

		// Check if all team members have their email addresses verified
		if (team_members.find(member => member.email_verified === false))
			return res.status(403).send(Response(errors[403].teamMemberEmailUnverified));

		// Check if the user is already registered for the current event
		let results = await Team.find({
			"event_participated.event_id": event_participated.event_id,
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
				"event_participated.event_id": event_participated.event_id,
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
				aura_id: res.locals.user.aura_id,
				usn: res.locals.user.usn,
				name: res.locals.user.name,
				email: res.locals.user.email,
			},
			team_members: team_members.map(member => ({
				id: member._id,
				aura_id: member.aura_id,
				email: member.email,
				name: member.name,
				usn: member.usn,
			})),
		});

		if (!res.locals.data)
			res.locals.data = {};
		res.locals.data.team = newTeam;
		res.locals.status = 201;
	} catch (error) {
		const { status, message } = errorHandler(error, errors[400].teamAlreadyExists);
		return res.status(status).send(Response(message));
	}

	return next();
};

// Fetch all teams
module.exports.fetchAll = async (req, res, next) => {
	try {
		const { query } = req;

		let {
			pageSize = queryConfig["search.pagination"]["page.size"],
			paginationTs = Date.now(),
		} = query;

		const teams = await Team.find({
			updatedAt: { $lte: paginationTs },
		})
			.sort({ updatedAt: -1 })
			.limit(pageSize + 1);

		if (!res.locals.data)
			res.locals.data = {};
		res.locals.data.pageSize = pageSize;
		res.locals.data.resultsSize = (teams.length === pageSize + 1 ? pageSize : teams.length);
		res.locals.data.paginationTs = (teams.length - 1 === pageSize ? teams[teams.length - 1].updatedAt.getTime() : null);
		res.locals.data.results = teams.copyWithin(0, 0, teams.length - 1);
	} catch (error) {
		const { status, message } = errorHandler(error);
		return res.status(status).send(Response(message));
	}

	return next();
};

// Fetch all teams under the a specific event
module.exports.fetchByEvent = async (req, res, next) => {
	try {
		const { params, query } = req;

		const { id } = params;
		let {
			user_id = undefined,
			pageSize = queryConfig["search.pagination"]["page.size"],
			paginationTs = Date.now(),
		} = query;

		const teams = await Team.find({
			"event_participated.event_id": id,
			...(user_id !== undefined ? {
				"team_leader.id": user_id,
			} : {}),
			updatedAt: { $lte: paginationTs },
		})
			.sort({ updatedAt: -1 })
			.limit(pageSize + 1);

		if (!res.locals.data)
			res.locals.data = {};
		res.locals.data.pageSize = pageSize;
		res.locals.data.resultsSize = (teams.length === pageSize + 1 ? pageSize : teams.length);
		res.locals.data.paginationTs = (teams.length - 1 === pageSize ? teams[teams.length - 1].updatedAt.getTime() : null);
		res.locals.data.results = teams.copyWithin(0, 0, teams.length - 1);
	} catch (error) {
		const { status, message } = errorHandler(error);
		return res.status(status).send(Response(message));
	}

	return next();
};

// Fetch all teams containing a user (either as the team leader or a team member)
module.exports.fetchByUser = async (req, res, next) => {

	try {
		const { params, query } = req;

		const { id } = params;
		let {
			event_id = undefined,
			pageSize = queryConfig["search.pagination"]["page.size"],
			paginationTs = Date.now(),
		} = query;

		const teams = await Team.find({
			$or: [
				{
					"team_leader.id": id,
				},
				{
					team_members: { $elemMatch: { id } },
				},
			],
			...(event_id !== undefined ? {
				"event_participated.event_id": event_id,
			} : {}),
			updatedAt: { $lte: paginationTs },
		})
			.sort({ updatedAt: -1 })
			.limit(pageSize + 1);

		if (!res.locals.data)
			res.locals.data = {};
		res.locals.data.pageSize = pageSize;
		res.locals.data.resultsSize = (teams.length === pageSize + 1 ? pageSize : teams.length);
		res.locals.data.paginationTs = (teams.length - 1 === pageSize ? teams[teams.length - 1].updatedAt.getTime() : null);
		res.locals.data.results = teams.copyWithin(0, 0, teams.length - 1);
	} catch (error) {
		const { status, message } = errorHandler(error);
		return res.status(status).send(Response(message));
	}

	return next();
};

module.exports.modifyTeam = async (req, res, next) => {
	if (!res.locals.user)
		return res.status(401).send(Response(errors[401].authRequired));

	try {
		const { params, body } = req;

		const { id } = params;
		const team = await Team.findById(id);
		if (!team)
			return res.status(404).send(Response(errors[404].teamNotFound));
		if (String(team.team_leader.id) !== String(res.locals.user._id))
			return res.status(403).send(Response(errors[403].invalidOperation));

		const old_team_members = team.team_members.map(member => member.aura_id);
		let {
			team_name = undefined,
			team_members = undefined,
		} = body;

		if (team_members !== undefined && Array.isArray(team_members)) {
			// Check if team members contains leader
			if (team_members.find(aura_id => aura_id === res.locals.user.aura_id))
				return res.status(403).send(Response(errors[403].invalidOperation));

			team_members = await Promise.all(team_members.map(aura_id => User.findOne({ aura_id })));
			if (team_members.length > 0 && team_members.find(member => !member))
				return res.status(404).send(Response(errors[404].userNotFound));

			// Check if all team members have their email addresses verified
			if (team_members.find(member => member.email_verified === false))
				return res.status(403).send(Response(errors[403].teamMemberEmailUnverified));

			// Check if any new team member is already registered for the event
			const orFields = [];
			team_members
				.filter(member => !old_team_members.includes(member.aura_id))
				.forEach(member => {
					orFields.push({
						"team_leader.id": member._id,
					});
					orFields.push({
						team_members: { $elemMatch: { email: member.email } },
					});
				});
			if (orFields.length > 0) {
				// Check if at least one team member has already registered
				const results = await Team.find({
					"event_participated.event_id": team.event_participated.event_id,
					$or: orFields,
				});
				if (results.length > 0)
					// Already registered for the event
					return res.status(403).send(Response(errors[403].teamMemberAlreadyRegistered));
			}

			team.team_members = team_members.map(member => ({
				id: member._id,
				aura_id: member.aura_id,
				email: member.email,
				usn: member.usn,
				name: member.name,
			}));
		}

		if (team_name !== undefined)
			team.team_name = team_name;

		await team.save();

		if (!res.locals.data)
			res.locals.data = {};
		res.locals.data.team = team;
	} catch (error) {
		const { status, message } = errorHandler(error);
		return res.status(status).send(Response(message));
	}

	return next();
};

module.exports.deleteTeam = async (req, res, next) => {
	if (!res.locals.user)
		return res.status(401).send(Response(errors[401].authRequired));

	try {
		const { params } = req;

		const { id } = params;
		const team = await Team.findById(id);
		if (!team)
			return res.status(404).send(Response(errors[404].teamNotFound));
		if (String(team.team_leader.id) !== String(res.locals.user._id))
			return res.status(403).send(Response(errors[403].invalidOperation));

		await Team.deleteOne({ _id: team._id });
	} catch (error) {
		const { status, message } = errorHandler(error);
		return res.status(status).send(Response(message));
	}

	return next();
};
