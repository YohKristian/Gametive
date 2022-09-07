const router = require("express").Router();
//routes
const users = require("./usersRoute");
const midtrans = require("./midtransRoute");

router.get("/", (req, res) => {
	res.status(200).json({
		message: "OK",
	});
});

router.use("/users", users);
router.use("/midtrans", midtrans);

module.exports = router;
