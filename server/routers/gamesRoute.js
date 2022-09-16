const games = require("express").Router();
const gamesController = require('../controllers/gamesController')
const authentication = require("../middlewares/authentication");

games.post("/", authentication, gamesController.create)
games.get("/", gamesController.fetchAll)
games.get("/:gamesId", gamesController.fetchOne)
games.put("/:gamesId", authentication, gamesController.update)
games.patch("/:gamesId", authentication, gamesController.delete)

module.exports = games;
