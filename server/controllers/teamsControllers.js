const { Team } = require("../models");

class TeamController {
    static async getAllTeam(req, res, next) {
        try {
            res.status(200).json({
                message: "Success Create Token Transaction Midtrans"
            })
        } catch (error) {
            next(error);
        }
    }

    static async getDetailTeam(req, res, next) {
        try {
            res.status(200).json({
                message: "Get Detail"
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
            res.status(200).json({
                message: "Delete Team"
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = TeamController;