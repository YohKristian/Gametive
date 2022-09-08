const users = require("express").Router();
const authentication = require("../middlewares/authentication");

const usersController = require("../controllers/usersController");
const Authorization = require("../middlewares/authorization");

users.post("/login", usersController.login);
users.post("/register", usersController.create);
users.get("/:username", usersController.fetchOne);
//AUTHENTICATION HERE
users.use(authentication);
users.get("/", Authorization.admin, usersController.fetchAll);
users.put("/:username", Authorization.customer, usersController.update);
users.patch("/:username", Authorization.customer, usersController.delete);

module.exports = users;
