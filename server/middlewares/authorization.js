const e = require("express");
const { User } = require("../models");

module.exports = authorization = async (req, res, next) => {
	try {
		const { id, role, email } = req.user;
		console.log(id, "authorization");
		const { username } = req.params;

		if (role === "Admin") {
			next();
		} else if (role === "Customer") {
			const dataAuthorization = await User.findByPk(id);
			const { username: usernameId } = dataAuthorization;
			if (!usernameId === username) throw { code: 5 };
			next();
		}
	} catch (error) {
		next(error);
	}
};
