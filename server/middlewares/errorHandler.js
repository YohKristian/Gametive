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
    40: [404, "team detail not found"],
    41: [404, "fail to update, team detail not found"],
    42: [404, "fail to update, team detail not found"],
    100: [404, "user not found"],
  };

  if (errList[code]) {
    const [status, message] = errList[code];
    return res.status(status).json({ code, message });
  }
  // switch (code) {
  // 	case 1:
  // 		return res.status(400).json({ code, message: "invalid form data, please check your input" });
  // 	case 2:
  // 		return res.status(400).json({ code, message: "username / email is not available" });
  // 	case 3:
  // 		return res.status(400).json({ code, message: "username / password cannot be empty" });
  // 	case 4:
  // 		return res.status(400).json({ code, message: "username / password invalid" });
  // 	case 5:
  // 		return res.status(403).json({ code, message: "invalid authorization" });
  // 	case 6:
  // 		return res.status(400).json({ code, message: "invalid access_token" });
  // 	case 7:
  // 		return res.status(400).json({ code, message: "please fill your password" });
  // 	case 8:
  // 		return res.status(400).json({ code, message: "update password failed" });
  //   case 20:
  // 		return res.status(404).json({code, message: 'Event not found'});
  // 	case 40:
  // 		return res.status(404).json({ code, message: "team detail not found" });
  // 	case 41:
  // 		return res.status(404).json({ code, message: "fail to update, team detail not found" });
  // 	case 42:
  // 		return res.status(404).json({ code, message: "fail to delete, team detail not found" });
  // 	case 100:
  // 		return res.status(404).json({ code, message: "user not found" });
  // }
  //sequelize errors
  if (
    error.name == "SequelizeValidationError" ||
    error.name == "SequelizeUniqueConstraintError"
  ) {
    //compile the error since the error can be more than 1 data
    error = error.errors.map((x) => x.message);
    return res.status(400).json({ message: error });
  }
  //axios errors (if any)
  return res.status(500).json({ message: error });
};
