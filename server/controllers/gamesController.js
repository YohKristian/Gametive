const { Game } = require("../models");
const { Op } = require("sequelize");
const { redis } = require('../config/redis')

module.exports = class gamesController {
    static async create(req, res, next) {
        try {
            const { name, gameImg, youtubeUrl, gameUrl, releaseDate, developer, genre } = req.body

            const created = await Game.create({ name, gameImg, youtubeUrl, gameUrl, releaseDate, developer, genre })

            await redis.del('app:games')
            await redis.del('app:gameId')

            res.status(201).json(created)
        } catch (error) {
            next(error)
        }
    }

    static async fetchAll(req, res, next) {
        try {
            const gamesCache = await redis.get('app:games')

            if (gamesCache) {
                const games = JSON.parse(gamesCache)

                res.status(200).json(games || { message: "there is no data" })
            } else {
                const fetchResponse = await Game.findAll({
                    order: [["id", "desc"]]
                })

                await redis.set('app:games', JSON.stringify(fetchResponse))

                res.status(200).json(fetchResponse || { message: "there is no data" })
            }
        } catch (error) {
            next(error)
        }
    }

    static async fetchOne(req, res, next) {
        try {
            const reg = new RegExp('^[0-9]*$')
            const gamesId = req.params.gamesId
            const lastIdCache = await redis.get("app:gameId");

            if (reg.test(gamesId) == false) return res.status(404).json({ message: "game not found" });

            if (gamesId !== lastIdCache) {
                const fetchResponse = await Game.findByPk(+gamesId)

                if (!fetchResponse) return res.status(404).json({ message: "game not found" });

                await redis.set("app:gameDetailId", gamesId)

                await redis.set('app:game', JSON.stringify(fetchResponse))

                res.status(200).json(fetchResponse)
            } else {
                const gameDetail = JSON.parse(await redis.get('app:game'))
                res.status(200).json(gameDetail)
            }
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

            await redis.del('app:games')
            await redis.del('app:gameId')

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

            await redis.del('app:games')
            await redis.del('app:gameId')

            res.status(200).json({
                message: `Success delete game ${fetchResponse.name}`
            });
        } catch (error) {
            next(error)
        }
    }
};
