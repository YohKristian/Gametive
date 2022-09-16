const { User, Team, Participant, Event, sequelize } = require("../models");
const { Op } = require("sequelize");
const { comparePassword } = require("../helpers/bcryptjs");
const { createToken } = require("../helpers/jsonwebtoken");
const { redis } = require("../config/redis");
const { getPagination, getPagingData } = require("../helpers/pagination");
const { OAuth2Client } = require("google-auth-library");
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
					status: "Active"
				},
				attributes: { exclude: ["createdAt", "updatedAt"] },
			});

			if (!loginResponse || !comparePassword(password, loginResponse.password)) throw { code: 4 };

			//!TODO : need to adjust the information what to send as the token
			const token = createToken({
				username: loginResponse.username,
				email: loginResponse.email,
				id: loginResponse.id,
				role: loginResponse.role,
			});

			res
				.status(200)
				.json({ login: Boolean(loginResponse), access_token: token, username: loginResponse.username, role: loginResponse.role });
		} catch (error) {
			next(error);
		}
	}

	static async googleSignIn(req, res, next) {
		try {
			const { token_google } = req.headers;

			const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
			const ticket = await client.verifyIdToken({
				idToken: token_google,
				audience: process.env.GOOGLE_CLIENT_ID,
			});
			const payload = ticket.getPayload();
			const [user, created] = await User.findOrCreate({
				where: {
					email: payload.email,
					username: payload.email.split("@")[0],
				},
				defaults: {
					username: payload.email.split("@")[0],
					email: payload.email,
					password: "password_google",
				},
				hooks: false,
			});

			const token = createToken({
				username: user.username,
				email: user.email,
				id: user.id,
				role: user.role,
			});
			res.status(200).json({
				login: Boolean(user),
				access_token: token,
				username: user.username,
				role: user.role,
			});
		} catch (error) {
			next(error);
		}
	}

	static async create(req, res, next) {
		try {
			const { username, email, password } = req.body;

			if (!username || !email || !password) throw { code: 1 };

			const [createResponse, created] = await User.findOrCreate({
				where: { username, email },
				defaults: { username, email, password },
			});
			if (!created) throw { code: 2 };

			res.status(201).json(created);
		} catch (error) {
			next(error);
		}
	}

	static async createAdmin(req, res, next) {
		try {
			const { username, email, password } = req.body;

			if (!username || !email || !password) throw { code: 1 };

			const [createResponse, created] = await User.findOrCreate({
				where: { username, email },
				defaults: { username, email, password, role: "Admin" },
			});
			if (!created) throw { code: 2 };

			res.status(201).json(created);
		} catch (error) {
			next(error);
		}
	}
	static async fetchAll(req, res, next) {
		try {
			const reg = new RegExp("^[0-9]*$");

			const { page, size, search } = req.query;

			if (reg.test(page) == false || page <= 0) return res.status(404).json({ message: "user not found" });

			const pageLastPageCache = await redis.get("store:users:page");
			if (pageLastPageCache !== page || search || !search || size !== 8) {
				await redis.del("store:users_fetchAll");
			}

			// if (req.user.role !== "admin") throw { code: 5 }; //ONLY UNCOMMENT AFTER AUTHORIZATION & AUTHENTICATION DONE
			let storeFetchAll = await redis.get("store:users_fetchAll");
			if (storeFetchAll) return res.status(200).json(JSON.parse(storeFetchAll));

			const { limit, offset } = getPagination(page, size);
			const fetchResponse = await User.findAndCountAll({
				attributes: { exclude: ["password"] },
				order: [["id", "desc"]],
				where: {
					username: {
						[Op.iLike]: `%${search}%`,
					},
					status: "Active"
				},
				limit: limit,
				offset: offset,
			});
			const response = getPagingData(fetchResponse, page, limit);
			console.log(response);
			await redis.set("store:users_fetchAll", JSON.stringify(response));
			await redis.set("store:users:page", page);

			res.status(200).json(response || { message: "there is no data" });
		} catch (error) {
			next(error);
		}
	}
	static async fetchOne(req, res, next) {
		try {
			const { username } = req.params;
			// let storeFetchOne = JSON.parse(await redis.get("store:users_fetchOne")); //fetch and parse it
			// if (storeFetchOne.username === username) return res.status(200).json(storeFetchOne); //if the fetch username is the same as current username. then send it.
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
			if (!oldPassword || !newPassword) throw { code: 1 };

			//check oldPass
			const oldData = await User.findOne({ where: { id }, transaction: t });
			let dataCorrect = false,
				newData = null;

			//compare oldPassword with the password on database
			comparePassword(oldPassword, oldData.password) ? (dataCorrect = true) : (dataCorrect = false);

			//if correct, proceed to update the newPassword into database

			if (dataCorrect)
				newData = await User.update(
					{ password: newPassword },
					{ where: { id }, returning: true, individualHooks: true, transaction: t },
				);

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
	static async updateAdmin(req, res, next) {
		//update for admin, for user who forgot password
		const t = await sequelize.transaction();
		try {
			const id = req.params.userId; //from authentication
			const { newPassword } = req.body;
			if (!newPassword) throw { code: 1 };

			const oldData = await User.findOne({ where: { id }, transaction: t });
			let newData;

			//if correct, proceed to update the newPassword into database
			if (oldData) {
				const [affectedColumn, responseData] = await User.update(
					{ password: newPassword },
					{ where: { id }, returning: true, individualHooks: true, transaction: t },
				);
				newData = responseData;
			}

			//check newData
			if (!newData) throw { code: 8 };
			await t.commit();
			await redis.del("store:users_fetchOne");
			await redis.del("store:users_fetchAll");
			res.status(200).json({ username: newData[0].username, message: "password has been changed" });
		} catch (error) {
			await t.rollback();
			next(error);
		}
	}
	static async delete(req, res, next) {
		//soft delete (change status from active -> inactive)
		try {
			const id = req.params.userId; //from authentication
			const findUser = await User.findByPk(id);
			if (!findUser) throw { code: 9 };
			await User.update({ status: "Inactive" }, { where: { id } });
			res.status(200).json({ id: +id, message: "user has been deleted" });
		} catch (error) {
			next(error);
		}
	}
	static async fetchAllHistory(req, res, next) {
		try {
			const fetchResponse = await User.findOne({
				attributes: { exclude: ["password", "createdAt", "updatedAt"] },
				include: {
					model: Team,
					attributes: { exclude: ["createdAt", "updatedAt"] },
					include: {
						model: Participant,
						attributes: { exclude: ["createdAt", "updatedAt"] },
						where: {
							statusPay: "Paid",
						},
						include: {
							model: Event,
							attributes: ["name", "eventDate", "price"],
						},
					},
				},
				where: {
					id: req.user.id,
				},
			});

			res.status(200).json(fetchResponse);
		} catch (error) {
			next(error);
		}
	}
};
