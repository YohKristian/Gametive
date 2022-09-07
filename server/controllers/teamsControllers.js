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
            const teamId = +req.params.teamId;

            const data = await Team.findByPk(teamId, {
                // include: Participant, User
            })

            if (!data) throw { code: 40 };

            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async createTeam(req, res, next) {
        try {
            const newTeam = {
                name: req.body.name,
                CaptainName: req.user.username,
                MemberName1: req.body.MemberName1,
                MemberName2: req.body.MemberName2,
                MemberName3: req.body.MemberName3,
                MemberName4: req.body.MemberName4,
            }

            const data = await Team.create(newTeam)

            res.status(201).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async editTeam(req, res, next) {
        try {
            const teamId = req.params.teamId;

            const findTeam = await Team.findByPk(teamId)

            if (!findTeam) throw { code: 41 };

            const updateTeam = {
                name: req.body.name,
                CaptainName: req.user.username,
                MemberName1: req.body.MemberName1,
                MemberName2: req.body.MemberName2,
                MemberName3: req.body.MemberName3,
                MemberName4: req.body.MemberName4,
            }

            const data = await Team.update(updateTeam, {
                where: {
                    id: teamId
                }
            })

            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async deleteTeam(req, res, next) {
        try {
            const teamId = req.params.teamId;

            const findTeam = await Team.findByPk(teamId)

            if (!findTeam) throw { code: 42 };

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