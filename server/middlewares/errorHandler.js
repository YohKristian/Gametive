module.exports = errorHandler = (error, req, res, next) => {
	console.log(error);
	//human-made errors
	const { code } = error;
	const errList = {
		1: [400, "invalid form data, please check your input"],
		2: [400, "username / email is not available"],
		3: [400, "username / password cannot be empty"],
		4: [401, "username / password invalid"],
		5: [403, "invalid authorization"],
		6: [400, "invalid access_token"],
		8: [400, "failed to change password"],
		9: [404, "fail to delete, this user is not found"],
		20: [404, "Event not found"],
		21: [400, "only size 4/8/16 are available"],
		22: [400, "failed to change bracket"],
		23: [400, "event status cannot be empty"],
		24: [400, "failed to update status"],
		40: [404, "team detail not found"],
		41: [404, "fail to update, team detail not found"],
		42: [404, "fail to delete, team detail not found"],
		43: [403, "fail to update, this team is not your item"],
		44: [403, "fail to delete, this team is not your item"],
		80: [400, "team already registered!"],
		81: [400, "organizers are prohibited from participating!"],
		100: [404, "user not found"],
		101: [400, "payment failed"],
		404: [404, "data not found"],
	};

	if (errList[code]) {
		const [status, message] = errList[code];
		return res.status(status).json({ code, message });
	}

	if (error.name == "SequelizeValidationError" || error.name == "SequelizeUniqueConstraintError") {
		//compile the error since the error can be more than 1 data
		error = error.errors.map((x) => x.message);
		return res.status(400).json({ message: error });
	}
	//axios errors (if any)
	return res.status(500).json({ message: error });
};
