const { User, sequelize } = require("../models");
const { Op } = require("sequelize");
const { comparePassword } = require("../helpers/bcryptjs");
const { createToken } = require("../helpers/jsonwebtoken");
const { redis } = require("../config/redis");
// 			await redis.del("store:users_fetchAll");

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

			//!TODO : need to adjust the information what to send as the token
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
			let storeFetchAll = await redis.get("store:users_fetchAll");
			if (storeFetchAll) return res.status(200).json(JSON.parse(storeFetchAll));

			const fetchResponse = await User.findAll({ attributes: { exclude: ["password"] } });

			await redis.set("store:users_fetchAll", JSON.stringify(fetchResponse));
			res.status(200).json(fetchResponse || { message: "there is no data" });
		} catch (error) {
			next(error);
		}
	}
	static async fetchOne(req, res, next) {
		try {
			const { username } = req.params;
			let storeFetchOne = JSON.parse(await redis.get("store:users_fetchOne")); //fetch and parse it
			if (storeFetchOne.username === username) return res.status(200).json(storeFetchOne); //if the fetch username is the same as current username. then send it.
			const fetchResponse = await User.findOne({ where: { username }, attributes: { exclude: ["password"] } });

			if (!fetchResponse) throw { code: 404 };

			await redis.set("store:users_fetchOne", JSON.stringify(fetchResponse)); //set the detail as the new cache.
			res.status(200).json(fetchResponse);
		} catch (error) {
			next(error);
		}
	}
	static async update(req, res, next) {
		//update only accept password change for now (even admin cant change anything other than password)
		const t = await sequelize.transaction();
		try {
			// const {id} = req.user //from authentication
			const { id, username } = req.user;
			const { oldPassword, newPassword } = req.body;
			if (!oldPassword || !newPassword) throw { code: 7 };

			//check oldPass
			const oldData = await User.findOne({ where: { id }, transaction: t });
			let dataCorrect = false,
				newData = null;

			//compare oldPassword with the password on database
			comparePassword(oldPassword, oldData.password) ? (dataCorrect = true) : (dataCorrect = false);

			//if correct, proceed to update the newPassword into database
			if (dataCorrect) newData = await User.update({ password: newPassword }, { where: { id }, returning: true, individualHooks: true, transaction: t });

			//check newData
			if (!newData) throw { code: 8 };

			await t.commit();
			await redis.del("store:users_fetchOne");
			await redis.del("store:users_fetchAll");
			res.status(200).json({ username, message: "password has been changed" });
		} catch (error) {
			await t.rollback();
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
