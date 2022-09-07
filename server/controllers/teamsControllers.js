const { Team, Participant, User } = require("../models");

class TeamController {
    static async getAllTeam(req, res, next) {
        try {
            const data = await Team.findAll()

            res.status(200).json(data)
        } catch (error) {
            next(error);
        }
    }

    static async getDetailTeam(req, res, next) {
        try {
            const teamId = req.body.teamId;
            const data = await Team.findByPk(teamId, {
                include: Participant, User
            })

            if (!data) throw { code: 999 };

            res.status(200).json({
                message: "Get Detail",
                team: data
            })
        } catch (error) {
            next(error)
        }
    }

    static async createTeam(req, res, next) {
        try {
            res.status(201).json({
                message: "Create Team"
            })
        } catch (error) {
            next(error)
        }
    }

    static async editTeam(req, res, next) {
        try {
            res.status(200).json({
                message: "Edit Team"
            })
        } catch (error) {
            next(error)
        }
    }

    static async deleteTeam(req, res, next) {
        try {
            const teamId = req.body.teamId;

            const findTeam = await Team.findByPk(teamId)

            if (!findTeam) throw { code: 999 };

            await Team.destroy({
                where: {
                    id: teamId
                }
            })

            res.status(200).json({
                message: "Success Delete Team"
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = TeamController;