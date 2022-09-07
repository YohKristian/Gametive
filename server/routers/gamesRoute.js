const games = require("express").Router();
const gamesController = require('../controllers/gamesController')

games.post("/", gamesController.create)
games.get("/", gamesController.fetchAll)
games.get("/:gamesId", gamesController.fetchOne)
games.put("/:gamesId", gamesController.update)
games.delete("/:gamesId", gamesController.delete)

module.exports = games;
