const Team=require('../models/Team')

const Team = require('../models/team');

// Create a new team
module.exports.createTeam = async (req, res) => {
    try {
        const { event, team_name, team_members } = req.body;
        
        const newTeam = new Team({
            event,
            team_name,
            team_members
        });

        await newTeam.save();
        res.status(201).json({ message: 'Team created successfully.', team: newTeam });
    } catch (err) {
        res.status(500).json({ message: 'Failed to create team.', error: err });
    }
};

// Fetch all teams under the a specific event
module.exports.fetchTeams = async (req, res) => {
    try {
        const event = req.params.event;
        const teams = await Team.find({ event: event });
        res.status(200).json({ teams });
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch teams.', error: err });
    }
};
