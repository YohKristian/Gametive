const { User, Event, Game, Location, sequelize } = require("../models");
const { redis } = require("../config/redis");
const { getPagination, getPagingData } = require("../helpers/pagination");
const { Op } = require("sequelize");

class Controller {
	static async showAllEventForUser(req, res, next) {
		try {
			await redis.del("app:event");
			await redis.del("app:event:page");
			const { page, size, search } = req.query;
			const lastPage = await redis.get("app:event:page");

			if (lastPage !== page || search || !search) {
				await redis.del("app:event");
			}
			const cache = await redis.get("app:event");
			if (cache) {
				const eventscache = JSON.parse(cache);
				res.status(200).json(eventscache);
			} else {
				const { limit, offset } = getPagination(page, size);
				let fetchEvent = await Event.findAndCountAll({
					include: [{ model: User, attributes: { exclude: ["password"] } }, Game, Location],
					where: {
						name: {
							[Op.iLike]: `%${search}%`,
						},
						// eventStatus: ["Active", "Finished"],
						UserId: +req.user.id,
					},
					order: [["createdAt", "DESC"]],
					limit: limit,
					offset: offset,
				});

				const response = getPagingData(fetchEvent, page, limit);
				await redis.set("app:event", JSON.stringify(response));
				await redis.set("app:event:page", page);

				res.status(200).json(response);
			}
		} catch (error) {
			next(error);
		}
	}

	static async showAllEvent(req, res, next) {
		try {
			await redis.del("app:event");
			await redis.del("app:event:page");
			const { page, size, search } = req.query;
			const lastPage = await redis.get("app:event:page");

			if (lastPage !== page || search || !search || size !== 8) {
				await redis.del("app:event");
			}

			const cache = await redis.get("app:event");
			if (cache) {
				const eventscache = JSON.parse(cache);
				res.status(200).json(eventscache);
			} else {
				const { limit, offset } = getPagination(page, size);
				let fetchEvent = await Event.findAndCountAll({
					include: [{ model: User, attributes: { exclude: ["password"] } }, Game, Location],
					where: {
						name: {
							[Op.iLike]: `%${search}%`,
						},
						eventStatus: req.user?.role == "Admin" ? ["Active", "Finished", "Pending", "Archived"] : ["Active", "Finished"],
					},
					order: [["createdAt", "DESC"]],
					limit: limit,
					offset: offset,
				});

				const response = getPagingData(fetchEvent, page, limit);
				await redis.set("app:event", JSON.stringify(response));
				await redis.set("app:event:page", page);
				// console.log(response);
				res.status(200).json(response);
			}
		} catch (error) {
			next(error);
		}
	}

	static async addEvent(req, res, next) {
		let t = await sequelize.transaction();
		try {
			const {
				eventName,
				description,
				price,
				rules,
				eventPoster,
				eventDate,
				eventType,
				GameId,
				locationName,
				ProvinceId,
				RegencyId,
				DistrictId,
				size,
			} = req.body;

			let locationCreate = await Location.create({ name: locationName, ProvinceId, RegencyId, DistrictId }, { transaction: t });
			let Bracket;

			/* CREATE TEMPLATE BRACKET */
			switch (+size) {
				case 4:
					Bracket = require("../template/4slot.json");
					break;
				case 8:
					Bracket = require("../template/8slot.json");
					break;
				case 16:
					Bracket = require("../template/16slot.json");
					break;
				default:
					throw { code: 21 };
			}
			/* FILL stage name with eventName */
			Bracket.stage[0].name = eventName;

			let data = await Event.create(
				{
					name: eventName,
					description,
					price,
					rules,
					eventStatus: "Pending",
					eventPoster,
					eventDate,
					eventType,
					UserId: req.user.id,
					GameId,
					LocationId: locationCreate.id,
					size,
					Bracket: JSON.stringify(Bracket),
				},
				{ transaction: t },
			);

			await t.commit();
			await redis.del("app:event");
			res.status(201).json(data);
		} catch (error) {
			await t.rollback();
			next(error);
		}
	}

	static async showEventDetail(req, res, next) {
		try {
			const { id } = req.params;
			const data = await Event.findOne({
				where: { id: id },
				include: [Game, Location, { model: User, attributes: ["username"] }],
			});

			if (!data) throw { code: 20 };
			res.status(200).json(data);
		} catch (error) {
			next(error);
		}
	}

	static async editEvent(req, res, next) {
		try {
			const { id } = req.params;
			const {
				eventName,
				locationName,
				description,
				price,
				rules,
				eventPoster,
				eventDate,
				eventType,
				GameId,
				ProvinceId,
				RegencyId,
				DistrictId,
			} = req.body;
			const events = await Event.findOne({ where: { id: id } });
			const lokasi = await Location.findOne({ where: { id: events.LocationId } });
			const data = await Event.update(
				{
					name: eventName,
					description,
					price,
					rules,
					eventPoster,
					eventDate,
					eventType,
					GameId,
					LocationId: lokasi.id,
				},
				{ where: { id: id } },
			);
			await Location.update({ name: locationName, ProvinceId, RegencyId, DistrictId }, { where: { id: lokasi.id } });
			await redis.del("app:event");
			res.status(200).json({ message: "Success edit event" });
		} catch (error) {
			next(error);
		}
	}

	static async patchStatus(req, res, next) {
		try {
			const { id } = req.params;
			const { eventStatus } = req.body;

			if (!eventStatus) throw { code: 23 };

			let [data] = await Event.update({ eventStatus }, { where: { id: id } });

			if (data == 0) throw { code: 404 };

			await redis.del("app:event");
			res.status(200).json(data);
		} catch (error) {
			next(error);
		}
	}

	static async editBracket(req, res, next) {
		/**
		 *
		 * @info : req.body = bracket <object>
		 * this will need 3 items, { participant, stage, match }
		 * to manipulate bracket later.
		 *
		 */
		const t = await sequelize.transaction();
		try {
			const { id } = req.params;
			let { bracket } = req.body; //MAKE SURE IT IS STRINGIFIED WHEN RECEIVED

			let { participant: newParticipant, stage: newStage, match: newMatch } = JSON.parse(bracket);

			let dataBracket = await Event.findByPk(id, { transaction: t });

			if (!dataBracket) throw { code: 404 };

			if (dataBracket.UserId !== req.user.id) throw { code: 5 };

			dataBracket = { ...dataBracket.dataValues, Bracket: JSON.parse(dataBracket.Bracket) };
			let newBracket = { ...dataBracket.Bracket, participant: newParticipant, stage: newStage, match: newMatch };

			const [updateCheck, _] = await Event.update(
				{ Bracket: JSON.stringify(newBracket) },
				{ where: { id }, transaction: t, returning: true },
			);

			await t.commit();
			await redis.del("app:event");
			res.status(200).json({ event: dataBracket.name, message: "bracket has been changed" });
		} catch (error) {
			await t.rollback();
			next(error);
		}
	}
}

module.exports = Controller;
