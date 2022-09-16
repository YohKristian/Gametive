const e = require("express");
const { User } = require("../models");

module.exports = class Authorization {
	static async customer(req, res, next) {
		try {
			const { id, role, email } = req.user;
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
	}

	static async admin(req, res, next) {
		try {
			const { role } = req.user;
			if (role !== "Admin") throw { code: 5 };
			next();
		} catch (error) {
			next(error);
		}
	}
};
