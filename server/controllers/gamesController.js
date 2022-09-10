const { Game } = require("../models");
const { Op } = require("sequelize");
const { redis } = require("../config/redis");
const { getPagination, getPagingData } = require("../helpers/pagination");

module.exports = class gamesController {
  static async create(req, res, next) {
    try {
      const {
        name,
        gameImg,
        youtubeUrl,
        gameUrl,
        releaseDate,
        developer,
        genre,
      } = req.body;

      const created = await Game.create({
        name,
        gameImg,
        youtubeUrl,
        gameUrl,
        releaseDate,
        developer,
        genre,
      });

<<<<<<< HEAD
            await redis.del('app:games')
            await redis.del('app:gameId')
            await redis.del('app:games:page')
=======
      await redis.del("app:games");
      await redis.del("app:gameId");
>>>>>>> e22d61d0fdbd179d0ee1f1568d90704cc71cdcfa

      res.status(201).json(created);
    } catch (error) {
      next(error);
    }
  }

  static async fetchAll(req, res, next) {
    try {
      const reg = new RegExp("^[0-9]*$");

      const { page, size, search } = req.query;

<<<<<<< HEAD

            if (reg.test(page) == false || page <= 0) return res.status(404).json({ message: "game not found" });

            const pageLastPageCache = await redis.get('app:games:page')
            if (pageLastPageCache !== page || search || !search) {
                await redis.del('app:games')
            }
=======
      if (reg.test(page) == false || page <= 0)
        return res.status(404).json({ message: "game not found" });

      const pageLastPageCache = await redis.get("app:games:page");

      if (pageLastPageCache !== page || search) {
        await redis.del("app:games");
      }
>>>>>>> e22d61d0fdbd179d0ee1f1568d90704cc71cdcfa

      const gamesCache = await redis.get("app:games");

<<<<<<< HEAD
            if (gamesCache) {
                const games = JSON.parse(gamesCache)
                res.status(200).json(games || { message: "there is no data" })
            } else {
                const { limit, offset } = getPagination(page, size)
                const fetchResponse = await Game.findAndCountAll({
                    order: [["id", "desc"]],
                    where: {
                        name: {
                            [Op.iLike]: `%${search}%`
                        }
                    },
                    limit: limit,
                    offset: offset
                })
                const response = getPagingData(fetchResponse, page, limit)
                const { count: totalItems, rows: items } = fetchResponse
=======
      if (gamesCache) {
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
          },
          limit: limit,
          offset: offset,
        });
>>>>>>> e22d61d0fdbd179d0ee1f1568d90704cc71cdcfa

        const response = getPagingData(fetchResponse, page, limit);
        const { count: totalItems, rows: products } = fetchResponse;

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

      if (reg.test(gamesId) == false)
        return res.status(404).json({ message: "game not found" });

      if (gamesId !== lastIdCache) {
        const fetchResponse = await Game.findByPk(+gamesId);

        if (!fetchResponse)
          return res.status(404).json({ message: "game not found" });

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

      if (reg.test(gamesId) == false)
        return res.status(404).json({ message: "game not found" });

      const {
        name,
        gameImg,
        youtubeUrl,
        gameUrl,
        releaseDate,
        developer,
        genre,
      } = req.body;

      const fetchResponse = await Game.findByPk(+gamesId);

      if (!fetchResponse)
        return res.status(404).json({ message: "game not found" });

<<<<<<< HEAD
            await Game.update({ name, gameImg, youtubeUrl, gameUrl, releaseDate, developer, genre }, {
                where: {
                    id: +gamesId
                }
            })

            await redis.del('app:games')
            await redis.del('app:gameId')
            await redis.del('app:games:page')

            res.status(200).json({
                message: `Success update game ${fetchResponse.name}`
            });
        } catch (error) {
            next(error)
=======
      await Game.update(
        { name, gameImg, youtubeUrl, gameUrl, releaseDate, developer, genre },
        {
          where: {
            id: +gamesId,
          },
>>>>>>> e22d61d0fdbd179d0ee1f1568d90704cc71cdcfa
        }
      );

      await redis.del("app:games");
      await redis.del("app:gameId");

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

      if (reg.test(gamesId) == false)
        return res.status(404).json({ message: "game not found" });

      const fetchResponse = await Game.findByPk(+gamesId);

      if (!fetchResponse)
        return res.status(404).json({ message: "game not found" });

      await Game.destroy({
        where: {
          id: gamesId,
        },
      });

<<<<<<< HEAD
            await redis.del('app:games')
            await redis.del('app:gameId')
            await redis.del('app:games:page')
=======
      await redis.del("app:games");
      await redis.del("app:gameId");
>>>>>>> e22d61d0fdbd179d0ee1f1568d90704cc71cdcfa

      res.status(200).json({
        message: `Success delete game ${fetchResponse.name}`,
      });
    } catch (error) {
      next(error);
    }
  }
};
