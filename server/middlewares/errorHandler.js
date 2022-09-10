module.exports = errorHandler = (error, req, res, next) => {
	console.log(error);
	// res.json({
	// 	error
	// })
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
		20: [404, "Event not found"],
		21: [400, "only size 4/8/16 are available"],
		40: [404, "team detail not found"],
		41: [404, "fail to update, team detail not found"],
		42: [404, "fail to delete, team detail not found"],
		43: [403, "fail to update, this team is not your item"],
		44: [403, "fail to delete, this team is not your item"],
		100: [404, "user not found"],
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
