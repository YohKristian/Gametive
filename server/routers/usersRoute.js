const users = require("express").Router();
const authentication = require("../middlewares/authentication");
const usersController = require("../controllers/usersController");
const Authorization = require("../middlewares/authorization");

users.post("/login", usersController.login);
users.post("/google", usersController.googleSignIn);
users.post("/register", usersController.create);
users.post("/registerAdmin", usersController.createAdmin);
users.get("/history", authentication, Authorization.customer, usersController.fetchAllHistory);
users.get("/:username", usersController.fetchOne);
//AUTHENTICATION HERE
users.use(authentication);
users.get("/", Authorization.admin, usersController.fetchAll);
users.put("/:username", Authorization.customer, usersController.update);
users.put("/admin/:userId", Authorization.admin, usersController.updateAdmin);
users.delete("/:userId", Authorization.admin, usersController.delete);
users.patch("/:username", Authorization.customer, usersController.delete);

module.exports = users;
