const router = require("express").Router();
//routes
const users = require("./usersRoute");

router.get("/", (req, res) => {
	res.status(200).json({
		message: "OK",
	});
});

router.use("/users", users);

module.exports = router;
