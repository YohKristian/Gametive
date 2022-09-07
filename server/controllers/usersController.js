const { User } = require("../models");
const { Op } = require("sequelize");
const { comparePassword } = require("../helpers/bcryptjs");
const { createToken } = require("../helpers/jsonwebtoken");

module.exports = class usersController {
	static async login(req, res, next) {
		try {
			//able to accept username / email (since both of them are unique)
			const { username, password } = req.body;
			if (!username || !password) throw { code: 3 };

			const loginResponse = await User.findOne({
				where: {
					[Op.or]: [{ username: username }, { email: username }],
				},
				attributes: { exclude: ["createdAt", "updatedAt"] },
			});

			if (!loginResponse || !comparePassword(password, loginResponse.password)) throw { code: 4 };

			const token = createToken({ username: loginResponse.username, email: loginResponse.email, id: loginResponse.id, role: loginResponse.role });

			res.status(200).json({ login: Boolean(loginResponse), access_token: token });
		} catch (error) {
			next(error);
		}
	}
	static async create(req, res, next) {
		try {
			const { username, email, password } = req.body;
			if (!username || !email || !password) throw { code: 1 };

			const [createResponse, created] = await User.findOrCreate({ where: { username, email }, defaults: { username, email, password } });
			if (!created) throw { code: 2 };

			res.status(201).json(created);
		} catch (error) {
			next(error);
		}
	}
	static async fetchAll(req, res, next) {
		try {
			// if (req.user.role !== "admin") throw { code: 5 }; //ONLY UNCOMMENT AFTER AUTHORIZATION & AUTHENTICATION DONE
			const fetchResponse = await User.findAll({ attributes: { exclude: ["password"] } });

			res.status(200).json(fetchResponse || { message: "there is no data" });
		} catch (error) {
			next(error);
		}
	}
	static async fetchOne(req, res, next) {
		try {
			const { username } = req.params;
			const fetchResponse = await User.findOne({ where: { username }, attributes: { exclude: ["password"] } });

			if (!fetchResponse) return res.status(404).json({ message: "data not found" });

			res.status(200).json(fetchResponse);
		} catch (error) {
			next(error);
		}
	}
	static async update(req, res, next) {
		try {
			//update only accept password change for now (even admin cant change anything other than password)
			// const {id} = req.user //from authentication
			const { password } = req.body;
			const updateResponse = await User.update({ password }, { where: { id } });
			res.status(200).json(updateResponse);
		} catch (error) {
			next(error);
		}
	}
	static async delete(req, res, next) {
		//soft delete (change status from active -> inactive)
		try {
		} catch (error) {
			next(error);
		}
	}
};
