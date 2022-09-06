const users = require("express").Router();
const usersController = require("../controllers/usersController");

users.get("/", usersController.fetchAll);
users.post("/login", usersController.login);
users.post("/register", usersController.create);
users.get("/:username", usersController.fetchOne);
users.put("/:username", usersController.update);
users.patch("/:username", usersController.delete);

module.exports = users;
