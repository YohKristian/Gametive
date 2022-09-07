module.exports = errorHandler = (error, req, res, next) => {
	console.log(error);
	res.json({
		error
	})
	//human-made errors
	const { code } = error;
	switch (code) {
		case 1:
			return res.status(400).json({ code, message: "invalid form data, please check your input" });
		case 2:
			return res.status(400).json({ code, message: "username / email is not available" });
		case 3:
			return res.status(400).json({ code, message: "username / password cannot be empty" });
		case 4:
			return res.status(400).json({ code, message: "username / password invalid" });
		case 5:
			return res.status(403).json({ code, message: "invalid authorization" });
		case 6:
			return res.status(400).json({ code, message: "invalid access_token" });
		case 100:
			return res.status(404).json({ code, message: "user not found" });
	}
	//sequelize errors
	if (error.name == "SequelizeValidationError" || error.name == "SequelizeUniqueConstraintError") {
		//compile the error since the error can be more than 1 data
		error = error.errors.map((x) => x.message);
		return res.status(400).json({ message: error });
	}
	//axios errors (if any)
};
