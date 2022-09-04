const bcryptjs = require("bcryptjs");

function hashPassword(password) {
    return bcryptjs.hashSync(password, +process.env.SECRET_SALT);
}

function comparePassword(password, hashedPassword) {
    return bcryptjs.compareSync(password, hashedPassword);
}

module.exports = {
    hashPassword,
    comparePassword
};