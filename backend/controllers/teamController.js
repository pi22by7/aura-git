/* eslint-disable no-unreachable */
// Imports
const mongoose = require("mongoose");
const Team = require("../models/Team");
const User = require("../models/User");
const errors = require("../configs/error.codes.json");
const queryConfig = require("../configs/query.config.json");
const Response = require("../models/standard.response.model");
const Receipt = require("../models/Receipt");
const Event = require("../models/Event");
const { errorHandler } = require("../utils/utils");

// Body
// Create a new team
module.exports.createTeam = async (req, res, next) => {
  // if (Date.now() >= 1678793506692)
  return res.status(403).send(Response(errors[403].registrationsClosed));

  if (!res.locals.user) return res.status(401).send(Response(errors[401].authRequired));

  try {
    const { body } = req;
    if (!("event_participated" in body)) return res.status(400).send(Response(errors[400].eventDetailsRequired));
    if (!("team_name" in body)) return res.status(400).send(Response(errors[400].teamNameRequired));

    let { event_participated, team_name, team_members = [] } = req.body;

    if (!("event_id" in event_participated)) return res.status(400).send(Response(errors[400].eventDetailsRequired));

    // Validate event details
    const event = await Event.findById(event_participated.event_id);
    if (!event) return res.status(404).send(Response(errors[404].eventNotFound));

    // Check if the event has open registrations
    if (!event.canRegister()) return res.status(403).send(Response(errors[403].registrationsClosed));

    // Check if team members contains leader
    if (team_members.find((aura_id) => aura_id === res.locals.user.aura_id))
      return res.status(403).send(Response(errors[403].invalidOperation));

    // Check if team does not contain duplicate members
    if (team_members.length !== [...new Set(team_members)].length)
      return res.status(400).send(Response(errors[400].duplicateTeamMembers));

    team_members = await Promise.all(team_members.map((aura_id) => User.findOne({ aura_id })));
    if (team_members.length > 0 && team_members.length !== team_members.filter((member) => !!member).length)
      return res.status(404).send(Response(errors[404].userNotFound));

    // Validate with min. team size
    if (team_members.length < event.min_team_size - 1) return res.status(400).send(Response(errors[400].minTeamCount));

    // Trim length to max. allowed team size
    if (team_members.length > event.team_size) team_members = team_members.copyWithin(0, 0, event.team_size);

    // Check if all team members have their email addresses verified
    if (team_members.find((member) => member.email_verified === false))
      return res.status(403).send(Response(errors[403].teamMemberEmailUnverified));

    // Check if the user is already registered for the current event
    let results = await Team.find({
      "event_participated.event_id": event_participated.event_id,
      $or: [
        {
          "team_leader.id": res.locals.user._id,
        },
        {
          "team_members.id": res.locals.user._id,
        },
      ],
    });
    if (results.length > 0)
      // Already registered for the event
      return res.status(403).send(Response(errors[403].eventAlreadyRegistered));

    const orFields = [];
    team_members.forEach((member) => {
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

    let limit = parseInt(event.registration_limit);
    const query = { _id: event._id };

    if (!isNaN(limit)) query[`registered_teams.${limit - 1}`] = { $exists: false };

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
      team_members: team_members.map((member) => ({
        id: member._id,
        aura_id: member.aura_id,
        email: member.email,
        name: member.name,
        usn: member.usn,
      })),
    });

    const results2 = await Event.updateOne(query, {
      $push: { registered_teams: { team_id: newTeam._id, leader_id: res.locals.user._id } },
    });
    if (results2.modifiedCount === 0) {
      await Team.deleteOne({ _id: newTeam._id });
      return res.status(403).send(Response(errors[403].registrationsClosed));
    }

    if (!res.locals.data) res.locals.data = {};
    res.locals.data.team = newTeam;
    res.locals.status = 201;
  } catch (error) {
    const { status, message } = errorHandler(error, errors[400].teamAlreadyExists);
    return res.status(status).send(Response(message));
  }

  return next();
};

module.exports.createTeamNoAuth = async (req, res, next) => {
  try {
    const { body } = req;

    let {
      event_participated = undefined,
      team_name = undefined,
      team_members = [],
      transaction_id = undefined
    } = body;

    // Check if all fields are provided
    if (event_participated === undefined)
      return res.status(400).send(Response(errors[400].eventDetailsRequired));
    if (team_name === undefined)
      return res.status(400).send(Response(errors[400].teamNameRequired));
    if (team_members.length === 0)
      return res.status(400).send(Response(errors[400].minTeamCount));
    if (transaction_id === undefined)
      return res.status(400).send(Response(errors[400].transactionIdRequired));

    // Check if id is provided
    if (!("id" in event_participated)) return res.status(400).send(Response(errors[400].eventDetailsRequired));
    event_participated.event_id = event_participated.id;
    event_participated.event_title = event_participated.title;

    if (!/^[a-z0-9-]+$/i.test(transaction_id))
      return res.status(400).send(Response(errors[400].invalidTransactionId));

    // Validate event details
    const event = await Event.findById(event_participated.event_id);
    if (!event) return res.status(404).send(Response(errors[404].eventNotFound));

    // Check if the event has open registrations
    // if (!event.canRegister()) return res.status(403).send(Response(errors[403].registrationsClosed));

    // Check if team members contains leader
    // if (team_members.find((aura_id) => aura_id === res.locals.user.aura_id))
    //   return res.status(403).send(Response(errors[403].invalidOperation));

    // Check if team does not contain duplicate members
    if (team_members.length !== [...new Set(team_members)].length)
      return res.status(400).send(Response(errors[400].duplicateTeamMembers));

    team_members = await Promise.all(team_members.map((aura_id) => User.findOne({ aura_id })));
    if (team_members.length > 0 && team_members.length !== team_members.filter((member) => !!member).length)
      return res.status(404).send(Response(errors[404].userNotFound));

    // Validate with min. team size
    if (team_members.length < event.min_team_size - 1) return res.status(400).send(Response(errors[400].minTeamCount));

    // Trim length to max. allowed team size
    if (team_members.length > event.team_size) team_members = team_members.slice(0, event.team_size).filter(val => !!val);

    // Check if all team members have their email addresses verified
    if (team_members.find((member) => member.email_verified === false))
      return res.status(403).send(Response(errors[403].teamMemberEmailUnverified));

    // Check if the user is already registered for the current event
    let results = await Team.find({
      "event_participated.event_id": event_participated.event_id,
      $or: [
        {
          "team_leader.id": team_members[0]._id,
        },
        {
          "team_members.id": team_members[0]._id,
        },
      ],
    });
    if (results.length > 0)
      // Already registered for the event
      return res.status(403).send(Response(errors[403].eventAlreadyRegistered));

    const orFields = [];
    team_members.slice(1).forEach((member) => {
      orFields.push({
        "team_leader.id": member._id,
      });
      orFields.push({
        team_members: { $elemMatch: { email: member.email } },
      });
    });
    if (team_members.length > 1) {
      // Check if at least one team member has already registered
      results = await Team.find({
        "event_participated.event_id": event_participated.event_id,
        $or: orFields,
      });
      if (results.length > 0)
        // Already registered for the event
        return res.status(403).send(Response(errors[403].teamMemberAlreadyRegistered));
    }

    // Check if transaction id is unique
    if (await Receipt.findOne({ transaction_id }))
      return res.status(403).send(Response(errors[403].transactionIdAlreadyExists));

    let limit = parseInt(event.registration_limit);
    const query = { _id: event._id };

    if (!isNaN(limit)) query[`registered_teams.${limit - 1}`] = { $exists: false };

    // Register team
    const newTeam = await Team.create({
      event_participated,
      team_name,
      team_leader: {
        id: team_members[0]._id,
        aura_id: team_members[0].aura_id,
        usn: team_members[0].usn,
        name: team_members[0].name,
        email: team_members[0].email,
      },
      team_members: team_members.slice(1).map((member) => ({
        id: member._id,
        aura_id: member.aura_id,
        email: member.email,
        name: member.name,
        usn: member.usn,
      })),
      noauthreg: true,
    });

    // Create receipt
    const receipt = await Receipt.create({
      user: team_members[0]._id,
      event: newTeam.event_participated.event_id,
      team: newTeam._id,
      transaction_id,
    });

    // Update user (leader)
    team_members[0].paid_for.push({
      event_id: newTeam.event_participated.event_id,
      receipt_id: receipt._id,
    });
    await team_members[0].save();

    // Perform query
    const results2 = await Event.updateOne(query, {
      $push: {
        registered_teams: {
          team_id: newTeam._id,
          leader_id: team_members[0]._id,
          payment: {
            status: true,
            receipt_id: receipt._id,
          },
        }
      },
    });
    if (results2.modifiedCount === 0) {
      await Team.deleteOne({ _id: newTeam._id });
      await Receipt.deleteOne({ transaction_id });
      return res.status(403).send(Response(errors[403].registrationsClosed));
    }

    if (!res.locals.data) res.locals.data = {};
    res.locals.data.team = newTeam;
    res.locals.data.receipt = receipt;
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
      eventId = undefined,
      teamName = undefined,
      teamMemberAuraId = undefined,
      paymentStatus = undefined,
      pageSize = queryConfig["search.pagination"]["page.size"],
      paginationTs = Date.now(),
    } = query;
    pageSize = parseInt(pageSize, 10);
    paginationTs = parseInt(paginationTs, 10);

    // Disable regex quoting

    if (typeof paymentStatus === "string")
      paymentStatus = paymentStatus.toLowerCase() === "true";

    const find_query = {};
    if (eventId)
      find_query["event_participated.event_id"] = eventId;
    if (teamName)
      find_query.team_name = { $regex: teamName, $options: "i" };
    if (teamMemberAuraId)
      find_query.$or = [
        {
          "team_leader.aura_id": { $regex: teamMemberAuraId, $options: "i" },
        },
        {
          "team_members": {
            $elemMatch: {
              "aura_id": { $regex: teamMemberAuraId, $options: "i" },
            },
          },
        }
      ];

    if (typeof pageSize === "string") pageSize = parseInt(pageSize, 10);
    if (pageSize <= 0 || pageSize > queryConfig["search.pagination"]["page.max.size"])
      pageSize = queryConfig["search.pagination"]["page.size"];

    let aggregate = [];
    if (paymentStatus === undefined) {
      // Should display all teams
      aggregate = [
        ...(Object.keys(find_query).length > 0 ? [{
          "$match": find_query,
        }] : []), {
          "$sort": {
            "updatedAt": -1
          }
        }, {
          "$match": {
            "updatedAt": {
              "$lte": new Date(paginationTs)
            }
          }
        }, {
          "$limit": pageSize + 1
        }
      ];
    } else {
      // Show teams based on the payment status criteria
      aggregate = [
        ...(Object.keys(find_query).length > 0 ? [{
          "$match": find_query,
        }] : []), {
          "$lookup": {
            "from": "receipts",
            "localField": "_id",
            "foreignField": "team",
            "as": "receipt"
          }
        }, {
          "$match": {
            "receipt.0": {
              "$exists": !!paymentStatus
            }
          }
        }, {
          "$sort": {
            "updatedAt": -1
          }
        }, {
          "$match": {
            "updatedAt": {
              "$lte": new Date(paginationTs)
            }
          }
        }, {
          "$limit": pageSize + 1
        }
      ];
    }

    const teams = await Team.aggregate(aggregate);

    if (!res.locals.data) res.locals.data = {};
    res.locals.data.pageSize = pageSize;
    res.locals.data.resultsSize = teams.length === pageSize + 1 ? pageSize : teams.length;
    res.locals.data.paginationTs = teams.length - 1 === pageSize ? teams[teams.length - 1].updatedAt.getTime() : null;
    res.locals.data.results = teams.slice(0, pageSize).filter((team) => !!team);
  } catch (error) {
    const { status, message } = errorHandler(error);
    return res.status(status).send(Response(message));
  }

  return next();
};

module.exports.fetchPaidTeamsByEvent = async (req, res, next) => {
  try {
    const { params, query } = req;

    const { id } = params;
    let {
      pageSize = queryConfig["search.pagination"]["page.size"],
      paginationTs = Date.now(),
    } = query;
    pageSize = parseInt(pageSize, 10);
    paginationTs = parseInt(paginationTs, 10);

    if (typeof pageSize === "string") pageSize = parseInt(pageSize, 10);
    if (pageSize <= 0 || pageSize > queryConfig["search.pagination"]["page.max.size"])
      pageSize = queryConfig["search.pagination"]["page.size"];

    const aggregationQuery = [
      {
        "$lookup": {
          "from": "teams",
          "localField": "team",
          "foreignField": "_id",
          "as": "team"
        }
      }, {
        "$set": {
          "team_doc": {
            "$arrayElemAt": [
              "$team", 0
            ],
          }
        }
      }, {
        "$match": {
          "team_doc.event_participated.event_id": new mongoose.Types.ObjectId(id),
          "team_doc.updatedAt": {
            "$lte": new Date(paginationTs)
          }
        }
      }, {
        "$project": {
          "team_doc": 1
        }
      }, {
        "$sort": {
          "team_doc.updatedAt": -1
        }
      }, {
        "$limit": pageSize + 1,
      }
    ];
    const teams = await (await Receipt.aggregate(aggregationQuery)).map(doc => doc.team_doc);

    if (!res.locals.data) res.locals.data = {};
    res.locals.data.pageSize = pageSize;
    res.locals.data.resultsSize = teams.length === pageSize + 1 ? pageSize : teams.length;
    res.locals.data.paginationTs = teams.length - 1 === pageSize ? teams[teams.length - 1].updatedAt.getTime() : null;
    res.locals.data.results = teams.slice(0, pageSize).filter((team) => !!team);
  } catch (error) {
    const { status, message } = errorHandler(error);
    return res.status(status).send(Response(message));
  }

  return next();
};

module.exports.fetchUnpaidTeamsByEvent = async (req, res, next) => {
  try {
    const { params, query } = req;

    const { id } = params;
    let {
      pageSize = queryConfig["search.pagination"]["page.size"],
      paginationTs = Date.now(),
    } = query;
    pageSize = parseInt(pageSize, 10);
    paginationTs = parseInt(paginationTs, 10);

    if (typeof pageSize === "string") pageSize = parseInt(pageSize, 10);
    if (pageSize <= 0 || pageSize > queryConfig["search.pagination"]["page.max.size"])
      pageSize = queryConfig["search.pagination"]["page.size"];

    const aggregationQuery = [
      {
        "$match": {
          "event_participated.event_id": new mongoose.Types.ObjectId(id)
        }
      }, {
        "$lookup": {
          "from": "receipts",
          "localField": "_id",
          "foreignField": "team",
          "as": "_receipt"
        }
      }, {
        "$match": {
          "_receipt.0": {
            "$exists": false
          }
        }
      }, {
        "$sort": {
          "updatedAt": -1
        }
      }, {
        "$match": {
          "updatedAt": {
            "$lte": new Date(paginationTs)
          }
        }
      }, {
        "$limit": pageSize + 1
      }, {
        "$unset": "_receipt"
      }
    ];
    const teams = await Team.aggregate(aggregationQuery);

    if (!res.locals.data) res.locals.data = {};
    res.locals.data.pageSize = pageSize;
    res.locals.data.resultsSize = teams.length === pageSize + 1 ? pageSize : teams.length;
    res.locals.data.paginationTs = teams.length - 1 === pageSize ? teams[teams.length - 1].updatedAt.getTime() : null;
    res.locals.data.results = teams.slice(0, pageSize).filter((team) => !!team);
  } catch (error) {
    const { status, message } = errorHandler(error);
    return res.status(status).send(Response(message));
  }

  return next();
};

// Fetch team
module.exports.fetchById = async (req, res, next) => {
  try {
    const { params } = req;

    const { id } = params;

    const team = await Team.findById(id);
    if (!team) return res.status(404).send(Response(errors[404].teamNotFound));

    if (!res.locals.data) res.locals.data = {};
    res.locals.data.team = team;
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
    let { user_id = undefined, pageSize = queryConfig["search.pagination"]["page.size"], paginationTs = Date.now() } = query;
    pageSize = parseInt(pageSize, 10);
    paginationTs = parseInt(paginationTs, 10);

    if (typeof pageSize === "string") pageSize = parseInt(pageSize, 10);
    if (pageSize <= 0 || pageSize > queryConfig["search.pagination"]["page.max.size"])
      pageSize = queryConfig["search.pagination"]["page.size"];

    const teams = await Team.find({
      "event_participated.event_id": id,
      ...(user_id !== undefined
        ? {
          "team_leader.id": user_id,
        }
        : {}),
      updatedAt: { $lte: paginationTs },
    })
      .sort({ updatedAt: -1 })
      .limit(pageSize + 1);

    if (!res.locals.data) res.locals.data = {};
    res.locals.data.pageSize = pageSize;
    res.locals.data.resultsSize = teams.length === pageSize + 1 ? pageSize : teams.length;
    res.locals.data.paginationTs = teams.length - 1 === pageSize ? teams[teams.length - 1].updatedAt.getTime() : null;
    res.locals.data.results = teams.slice(0, pageSize).filter((team) => !!team);
  } catch (error) {
    const { status, message } = errorHandler(error);
    return res.status(status).send(Response(message));
  }

  return next();
};

// Fetch all teams under the a specific event
module.exports.fetchCompleteByEvent = async (req, res, next) => {
  try {
    const { params, query } = req;

    const { id } = params;
    let {
      pageSize = queryConfig["search.pagination"]["page.size"],
      paginationTs = Date.now(),
    } = query;
    pageSize = parseInt(pageSize, 10);
    paginationTs = parseInt(paginationTs, 10);

    if (typeof pageSize === "string") pageSize = parseInt(pageSize, 10);
    if (pageSize <= 0 || pageSize > queryConfig["search.pagination"]["page.max.size"])
      pageSize = queryConfig["search.pagination"]["page.size"];

    const aggregationQuery = [
      {
        "$match": {
          "event_participated.event_id": new mongoose.Types.ObjectId(id)
        }
      }, {
        "$sort": {
          "updatedAt": -1
        }
      }, {
        "$match": {
          "updatedAt": {
            "$lte": new Date(paginationTs)
          }
        }
      }, {
        "$limit": 21
      }, {
        "$lookup": {
          "from": "users",
          "localField": "team_leader.id",
          "foreignField": "_id",
          "as": "team_leader._doc"
        }
      }, {
        "$set": {
          "team_leader_doc": {
            "$arrayElemAt": [
              "$team_leader._doc", 0
            ]
          }
        }
      }, {
        "$lookup": {
          "from": "users",
          "localField": "team_members.id",
          "foreignField": "_id",
          "as": "team_members_docs"
        }
      }, {
        "$lookup": {
          "from": "receipts",
          "localField": "_id",
          "foreignField": "team",
          "as": "receipt_doc"
        }
      }, {
        "$set": {
          "receipt": {
            "$cond": [
              {
                "$eq": [
                  "$receipt_doc.0", null
                ]
              }, null, {
                "$arrayElemAt": [
                  "$receipt_doc", 0
                ]
              }
            ]
          }
        }
      }, {
        "$unset": [
          "_doc", "receipt_doc", "team_leader", "team_members"
        ]
      }
    ];
    const teams = await Team.aggregate(aggregationQuery);

    if (!res.locals.data) res.locals.data = {};
    res.locals.data.pageSize = pageSize;
    res.locals.data.resultsSize = teams.length === pageSize + 1 ? pageSize : teams.length;
    res.locals.data.paginationTs = teams.length - 1 === pageSize ? teams[teams.length - 1].updatedAt.getTime() : null;
    res.locals.data.results = teams.slice(0, pageSize).filter((team) => !!team);
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
    let { event_id = undefined, pageSize = queryConfig["search.pagination"]["page.size"], paginationTs = Date.now() } = query;
    pageSize = parseInt(pageSize, 10);
    paginationTs = parseInt(paginationTs, 10);

    if (typeof pageSize === "string") pageSize = parseInt(pageSize, 10);
    if (pageSize <= 0 || pageSize > queryConfig["search.pagination"]["page.max.size"])
      pageSize = queryConfig["search.pagination"]["page.size"];

    const teams = await Team.find({
      $or: [
        {
          "team_leader.id": id,
        },
        {
          team_members: { $elemMatch: { id } },
        },
      ],
      ...(event_id !== undefined
        ? {
          "event_participated.event_id": event_id,
        }
        : {}),
      updatedAt: { $lte: paginationTs },
    })
      .sort({ updatedAt: -1 })
      .limit(pageSize + 1);

    if (!res.locals.data) res.locals.data = {};
    res.locals.data.pageSize = pageSize;
    res.locals.data.resultsSize = teams.length === pageSize + 1 ? pageSize : teams.length;
    res.locals.data.paginationTs = teams.length - 1 === pageSize ? teams[teams.length - 1].updatedAt.getTime() : null;
    res.locals.data.results = teams.slice(0, pageSize).filter((team) => !!team);
  } catch (error) {
    const { status, message } = errorHandler(error);
    return res.status(status).send(Response(message));
  }

  return next();
};

module.exports.statsPaidTeams = async (req, res, next) => {
  try {
    const aggregationQuery = [
      {
        "$project": {
          "_id": 1
        }
      }, {
        "$lookup": {
          "from": "receipts",
          "localField": "_id",
          "foreignField": "team",
          "as": "_receipt"
        }
      }, {
        "$match": {
          "_receipt.0": {
            "$exists": true
          }
        }
      }, {
        "$count": "paid_teams_count"
      }
    ];
    const result = await Team.aggregate(aggregationQuery);

    if (!res.locals.data)
      res.locals.data = {};
    res.locals.data.result = result;
  } catch (error) {
    const { status, message } = errorHandler(error);
    return res.status(status).send(Response(message));
  }

  return next();
};

module.exports.statsUnpaidTeams = async (req, res, next) => {
  try {
    const aggregationQuery = [
      {
        "$project": {
          "_id": 1
        }
      }, {
        "$lookup": {
          "from": "receipts",
          "localField": "_id",
          "foreignField": "team",
          "as": "receipt"
        }
      }, {
        "$set": {
          "receipt_doc": {
            "$arrayElemAt": [
              "$receipt", 0
            ]
          }
        }
      }, {
        "$unset": "receipt"
      }, {
        "$match": {
          "receipt_doc": {
            "$eq": null
          }
        }
      }, {
        "$count": "unpaid_teams_count"
      }
    ];
    const result = await Team.aggregate(aggregationQuery);

    if (!res.locals.data)
      res.locals.data = {};
    res.locals.data.result = result;
  } catch (error) {
    const { status, message } = errorHandler(error);
    return res.status(status).send(Response(message));
  }

  return next();
};

module.exports.modifyTeam = async (req, res, next) => {
  // if (Date.now() >= 1678793506692)
  //   return res.status(403).send(Response(errors[403].registrationsClosed));

  if (!res.locals.user) return res.status(401).send(Response(errors[401].authRequired));

  try {
    const { params, body } = req;

    const { id } = params;
    const team = await Team.findById(id);
    if (!team) return res.status(404).send(Response(errors[404].teamNotFound));
    if (String(team.team_leader.id) !== String(res.locals.user._id))
      return res.status(403).send(Response(errors[403].invalidOperation));

    // Check if the payment is done, if yes team cannot be updated
    if (await Receipt.findOne({ team: id })) return res.status(403).send(Response(errors[403].teamLocked));

    const event = await Event.findById(team.event_participated.event_id);
    if (!event) return res.status(404).send(Response(errors[404].eventNotFound));

    const old_team_members = team.team_members.map((member) => member.aura_id);
    let { team_name = undefined, team_members = undefined } = body;

    if (team_members !== undefined && Array.isArray(team_members)) {
      // Check if team members contains leader
      if (team_members.find((aura_id) => aura_id === res.locals.user.aura_id))
        return res.status(403).send(Response(errors[403].invalidOperation));

      team_members = await Promise.all(team_members.map((aura_id) => User.findOne({ aura_id })));
      if (team_members.length > 0 && team_members.length !== team_members.filter((member) => !!member).length)
        return res.status(404).send(Response(errors[404].userNotFound));

      // Validate with min. team size
      if (team_members.length < event.min_team_size - 1) return res.status(400).send(Response(errors[400].minTeamCount));

      // Trim length to max. allowed team size
      if (team_members.length > event.team_size) team_members = team_members.copyWithin(0, 0, event.team_size);

      // Check if all team members have their email addresses verified
      if (team_members.find((member) => member.email_verified === false))
        return res.status(403).send(Response(errors[403].teamMemberEmailUnverified));

      // Check if any new team member is already registered for the event
      const orFields = [];
      team_members
        .filter((member) => !old_team_members.includes(member.aura_id))
        .forEach((member) => {
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

      team.team_members = team_members.map((member) => ({
        id: member._id,
        aura_id: member.aura_id,
        email: member.email,
        usn: member.usn,
        name: member.name,
      }));
    }

    if (team_name !== undefined) team.team_name = team_name;

    await team.save();

    if (!res.locals.data) res.locals.data = {};
    res.locals.data.team = team;
  } catch (error) {
    const { status, message } = errorHandler(error);
    return res.status(status).send(Response(message));
  }

  return next();
};

/* Not planned */
module.exports.deleteTeam = async (req, res, next) => {
  if (!res.locals.user) return res.status(401).send(Response(errors[401].authRequired));

  try {
    const { params } = req;

    const { id } = params;
    const team = await Team.findById(id);
    if (!team) return res.status(404).send(Response(errors[404].teamNotFound));
    if (String(team.team_leader.id) !== String(res.locals.user._id))
      return res.status(403).send(Response(errors[403].invalidOperation));

    await Team.deleteOne({ _id: team._id });
  } catch (error) {
    const { status, message } = errorHandler(error);
    return res.status(status).send(Response(message));
  }

  return next();
};
