const users = require("express").Router();
const authentication = require("../middlewares/authentication");

const usersController = require("../controllers/usersController");
const authorization = require("../middlewares/authorization");

users.post("/login", usersController.login);
users.post("/register", usersController.create);
users.get("/:username", usersController.fetchOne);
//AUTHENTICATION HERE
users.use(authentication);
users.get("/", usersController.fetchAll);
//AUTHORIZATION HERE
users.use(authorization);
users.put("/:username", usersController.update);
users.patch("/:username", usersController.delete);

module.exports = users;
