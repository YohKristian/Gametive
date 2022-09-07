const router = require("express").Router();
//routes
const users = require("./usersRoute");
const midtrans = require("./midtransRoute");
const events= require('./eventRoute');

router.get("/", (req, res) => {
	res.status(200).json({
		message: "OK",
	});
});
router.use('/events', events)
router.use("/users", users);
router.use("/midtrans", midtrans);

module.exports = router;
