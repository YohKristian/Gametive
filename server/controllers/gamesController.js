const { Game } = require("../models");
const { Op } = require("sequelize");
const { redis } = require("../config/redis");
const { getPagination, getPagingData } = require("../helpers/pagination");

module.exports = class gamesController {
	static async create(req, res, next) {
		try {
			const { name, gameImg, youtubeUrl, gameUrl, releaseDate, developer, genre } = req.body;

			const created = await Game.create({
				name,
				gameImg,
				youtubeUrl,
				gameUrl,
				releaseDate,
				developer,
				genre,
			});

			await redis.del("app:games");
			await redis.del("app:gameId");
			await redis.del("app:games:page");

			res.status(201).json(created);
		} catch (error) {
			next(error);
		}
	}

	static async fetchAll(req, res, next) {
		try {
			// await redis.del("app:games");
			// await redis.del("app:gameId");
			// await redis.del("app:games:page");
			const reg = new RegExp("^[0-9]*$");

			const { page, size, search } = req.query;

			if (reg.test(page) == false || page <= 0) throw { code: 404 };

			const pageLastPageCache = await redis.get("app:games:page");
			if (pageLastPageCache !== page || search || !search || size !== 8) {
				await redis.del("app:games");
			}
			const gamesCache = await redis.get("app:games");

			if (gamesCache) {
				console.log("cached");
				const games = JSON.parse(gamesCache);
				res.status(200).json(games || { message: "there is no data" });
			} else {
				const { limit, offset } = getPagination(page, size);
				const fetchResponse = await Game.findAndCountAll({
					order: [["id", "desc"]],
					where: {
						name: {
							[Op.iLike]: `%${search}%`,
						},
						status: "Active"
					},
					limit: limit,
					offset: offset,
				});
				const response = getPagingData(fetchResponse, page, limit);
				await redis.set("app:games", JSON.stringify(response));
				await redis.set("app:games:page", page);

				res.status(200).json(response || { message: "there is no data" });
			}
		} catch (error) {
			next(error);
		}
	}

	static async fetchOne(req, res, next) {
		try {
			const reg = new RegExp("^[0-9]*$");
			const gamesId = req.params.gamesId;
			const lastIdCache = await redis.get("app:gameId");

			if (reg.test(gamesId) == false) throw { code: 404 };

			if (gamesId !== lastIdCache) {
				const fetchResponse = await Game.findByPk(+gamesId);

				if (!fetchResponse) throw { code: 404 };

				await redis.set("app:gameDetailId", gamesId);
				await redis.set("app:game", JSON.stringify(fetchResponse));

				res.status(200).json(fetchResponse);
			} else {
				const gameDetail = JSON.parse(await redis.get("app:game"));
				res.status(200).json(gameDetail);
			}
		} catch (error) {
			next(error);
		}
	}

	static async update(req, res, next) {
		try {
			const reg = new RegExp("^[0-9]*$");
			const gamesId = req.params.gamesId;

			if (reg.test(gamesId) == false) return res.status(404).json({ message: "game not found" });

			const { name, gameImg, youtubeUrl, gameUrl, releaseDate, developer, genre } = req.body;

			const fetchResponse = await Game.findByPk(+gamesId);

			if (!fetchResponse) throw { code: 404 };

			await Game.update(
				{ name, gameImg, youtubeUrl, gameUrl, releaseDate, developer, genre },
				{
					where: {
						id: +gamesId,
					},
				},
			);

			await redis.del("app:games");
			await redis.del("app:gameId");
			await redis.del("app:games:page");

			res.status(200).json({
				message: `Success update game ${fetchResponse.name}`,
			});
		} catch (error) {
			next(error);
		}
	}

	static async delete(req, res, next) {
		try {
			const reg = new RegExp("^[0-9]*$");
			const gamesId = req.params.gamesId;

			if (reg.test(gamesId) == false) return res.status(404).json({ message: "game not found" });

			const fetchResponse = await Game.findByPk(+gamesId);

			if (!fetchResponse) throw { code: 404 };

			await Game.update({
				status: "Deleted"
			}, {
				where: {
					id: +gamesId
				}
			})

			// await Game.destroy({
			// 	where: {
			// 		id: gamesId,
			// 	},
			// });

			await redis.del("app:games");
			await redis.del("app:gameId");
			await redis.del("app:games:page");

			res.status(200).json({
				message: `Success delete game ${fetchResponse.name}`,
			});
		} catch (error) {
			next(error);
		}
	}
};
