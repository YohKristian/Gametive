const router = require("express").Router();
//routes
const users = require("./usersRoute");

const midtrans = require("./midtransRoute");

const games = require("./gamesRoute")

router.get("/", (req, res) => {
	res.status(200).json({
		message: "OK",
	});
});

router.use("/users", users);
router.use("/midtrans", midtrans);

//Games
router.use("/games", games)

module.exports = router;
