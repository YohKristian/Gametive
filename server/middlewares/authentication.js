const { verifyToken } = require("../helpers/jsonwebtoken");
const { User } = require("../models");

module.exports = authentication = async (req, res, next) => {
	try {
		const { access_token } = req.headers;
		if (!access_token) throw { code: 6 };

		const tokenVerify = verifyToken(access_token);
		const tokenResponse = await User.findByPk(tokenVerify.id);

		if (!tokenResponse) throw { code: 6 };

		//!TODO : need to adjust the information
		const { id, role, username, email } = tokenVerify;

		req.user = { id, role, username, email };
		next();
	} catch (error) {
		next(error);
	}
};
