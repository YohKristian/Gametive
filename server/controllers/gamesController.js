const { Game } = require("../models");
const { Op } = require("sequelize");
const games = require("../routers/gamesRoute");

module.exports = class gamesController {
    static async create(req, res, next) {
        try {
            const { name, gameImg, youtubeUrl, gameUrl, releaseDate, developer, genre } = req.body

            const created = await Game.create({ name, gameImg, youtubeUrl, gameUrl, releaseDate, developer, genre })

            res.status(201).json(created)
        } catch (error) {
            next(error)
        }
    }

    static async fetchAll(req, res, next) {
        try {
            const fetchResponse = await Game.findAll({
                order: [["id", "desc"]]
            })

            res.status(200).json(fetchResponse || { message: "there is no data" })
        } catch (error) {
            next(error)
        }
    }

    static async fetchOne(req, res, next) {
        try {
            const reg = new RegExp('^[0-9]*$')
            const gamesId = req.params.gamesId

            if (reg.test(gamesId) == false) return res.status(404).json({ message: "game not found" });

            const fetchResponse = await Game.findByPk(+gamesId)

            if (!fetchResponse) return res.status(404).json({ message: "game not found" });

            res.status(200).json(fetchResponse)
        } catch (error) {
            next(error)
        }
    }

    static async update(req, res, next) {
        try {
            const reg = new RegExp('^[0-9]*$')
            const gamesId = req.params.gamesId

            if (reg.test(gamesId) == false) return res.status(404).json({ message: "game not found" });

            const { name, gameImg, youtubeUrl, gameUrl, releaseDate, developer, genre } = req.body

            const fetchResponse = await Game.findByPk(+gamesId)

            if (!fetchResponse) return res.status(404).json({ message: "game not found" });

            await Game.update({ name, gameImg, youtubeUrl, gameUrl, releaseDate, developer, genre }, {
                where: {
                    id: +gamesId
                }
            })

            res.status(200).json({
                message: `Success update game ${fetchResponse.name}`
            });
        } catch (error) {
            next(error)
        }
    }

    static async delete(req, res, next) {
        try {
            const reg = new RegExp('^[0-9]*$')
            const gamesId = req.params.gamesId

            if (reg.test(gamesId) == false) return res.status(404).json({ message: "game not found" });

            const fetchResponse = await Game.findByPk(+gamesId)

            if (!fetchResponse) return res.status(404).json({ message: "game not found" });

            await Game.destroy({
                where: {
                    id: gamesId
                }
            })

            res.status(200).json({
                message: `Success delete game ${fetchResponse.name}`
            });
        } catch (error) {
            next(error)
        }
    }
};
