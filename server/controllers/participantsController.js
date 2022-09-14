const { User, Participant, Team, Event, sequelize } = require("../models");
const { redis } = require("../config/redis");

module.exports = class participantsController {
	static async create(req, res, next) {
		try {
			const { TeamId, EventId } = req.body;
			if (!TeamId || !EventId) throw { code: 1 };

			const findEvent = await Event.findOne({
				include: { model: User, attributes: ["username"] },
				where: {
					id: +EventId,
				},
			});

			if (req.user.username === findEvent.User.username) throw { code: 81 };

			const [createResponse, created] = await Participant.findOrCreate({
				where: { TeamId, EventId },
				defaults: { TeamId, EventId, paymentDate: new Date() },
			});

			console.log(createResponse.dataValues, "<----------");

			if (!created && createResponse.statusPay === "Paid") throw { code: 80 };

			await redis.del("app:participants");
			await redis.del("app:participantId");

			res.status(201).json(createResponse || created);
		} catch (error) {
			next(error);
		}
	}
	static async fetchAll(req, res, next) {
		try {
			const participantsCache = await redis.get("app:participants");

			if (participantsCache) {
				const participants = JSON.parse(participantsCache);

				res.status(200).json(participants || { message: "there is no data" });
			} else {
				const fetchResponse = await Participant.findAll({
					include: [{ model: Team }, { model: Event }],
				});

				res.status(200).json(fetchResponse || { message: "there is no data" });
			}
		} catch (error) {
			next(error);
		}
	}

	static async fetchOneParticipantByEventId(req, res, next) {
		try {
			const { eventId } = req.params;
			const lastIdCache = await redis.get("app:participantId");

			if (eventId !== lastIdCache) {
				const fetchResponse = await Participant.findOne({
					where: { EventId: +eventId },
					include: [{ model: Team }, { model: Event }],
				});

				if (!fetchResponse) throw { code: 404 };

				await redis.set("app:participantDetailId", eventId);
				await redis.set("app:participant", JSON.stringify(fetchResponse));
				res.status(200).json(fetchResponse);
			} else {
				const participantDetail = JSON.parse(await redis.get("app:participant"));
				res.status(200).json(participantDetail);
			}
		} catch (error) {
			next(error);
		}
	}

	static async updateByTeamId(req, res, next) {
		let t = await sequelize.transaction();
		try {
			const { eventId, teamId } = req.params;

			const fetchResponse = await Participant.findOne({
				where: {
					EventId: +eventId,
					TeamId: +teamId,
				},
				transaction: t,
			});

			if (!fetchResponse) throw { code: 404 };

			const payload = {
				paidStatus: "Paid",
				currentDate: new Date(),
			};

			await Participant.update(
				{
					statusPay: payload.paidStatus,
					paymentDate: payload.currentDate,
				},
				{
					where: {
						EventId: +eventId,
						TeamId: +teamId,
					},
					transaction: t,
				},
			);

			const fetchAllBracket = await Participant.findAll({
				include: Team,
				where: {
					EventId: +eventId,
					statusPay: "Paid",
				},
				order: [["paymentDate", "DESC"]],
				transaction: t,
			});

			const findEvent = await Event.findOne({
				where: {
					id: +eventId,
				},
				transaction: t,
			});

			// console.log(findEvent);

			let oldBracket = JSON.parse(findEvent.Bracket);

			oldBracket.stage[0].name = findEvent.name;

			fetchAllBracket.forEach((Bracket, idx) => {
				oldBracket.participant[idx].name = Bracket.Team.name;
			});

			await Event.update(
				{ Bracket: JSON.stringify(oldBracket) },
				{
					where: {
						id: +eventId,
					},
					transaction: t,
				},
			);

			await t.commit();
			await redis.del("app:participants");
			await redis.del("app:participantId");

			res.status(200).json({
				id: fetchResponse.id,
				TeamId: fetchResponse.TeamId,
				EventId: fetchResponse.EventId,
				statusPay: payload.paidStatus,
				paymentDate: payload.currentDate,
				createdAt: fetchResponse.createdAt,
				updatedAt: fetchResponse.updatedAt,
			});
		} catch (error) {
			await t.rollback();
			next(error);
		}
	}
	static async deleteParticipantById(req, res, next) {
		try {
			// const { participantId } = req.params;
			const { eventId, teamId } = req.params;

			const fetchResponse = await Participant.findOne({
				where: { EventId: +eventId, TeamId: +teamId },
			});

			if (!fetchResponse) throw { code: 404 };

			await Participant.destroy({
				where: { EventId: +eventId, TeamId: +teamId },
			});

			await redis.del("app:participants");
			await redis.del("app:participantId");

			res.status(200).json(fetchResponse);
		} catch (error) {
			next(error);
		}
	}
};
