const router = require("express").Router();
//routes
const users = require("./usersRoute");
const participants = require("./participantsRoute");
const teams = require("./teamsRoute");
const midtrans = require("./midtransRoute");
const events= require('./eventRoute');
const games = require("./gamesRoute");


router.get("/", (req, res) => {
	res.status(200).json({
		message: "OK",
	});
});
router.use('/events', events)
router.use("/users", users);
router.use("/participants", participants);
router.use("/teams", teams);
router.use("/midtrans", midtrans);

//Games
router.use("/games", games);

module.exports = router;
