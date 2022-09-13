const midtransClient = require("midtrans-client");
const { sequelize, Participant, Team, Event } = require("../models");
const { redis } = require("../config/redis");

class MidtransController {
	static async generateSnapToken(req, res, next) {
		try {
			const totalCostNeedToPay = 5000 + req.body.totalCostNeedToPay;
			const TeamId = req.body.TeamId;
			const EventId = req.body.EventId;

			// Create Snap API instance
			let snap = new midtransClient.Snap({
				// Set to true if you want Production Environment (accept real transaction).
				isProduction: false,
				serverKey: `${process.env.SECRET_Server_Key}`,
			});

			let parameter = {
				transaction_details: {
					order_id: `ORDERID-${Date.now()}-${TeamId}-${EventId}`,
					gross_amount: +totalCostNeedToPay,
				},
				credit_card: {
					secure: true,
				},
				customer_details: {
					first_name: req.user.username,
					last_name: "",
					email: req.user.email,
				},
			};

			const { token } = await snap.createTransaction(parameter);
			res.status(201).json(token);
		} catch (error) {
			next(error);
		}
	}

	static async updateStatusToPayed(req, res, next) {
		let t = await sequelize.transaction();
		try {
			const { transaction_status, order_id } = req.body;

			const [text, time, teamId, eventId] = order_id.split("-");

			if (transaction_status !== "capture" && transaction_status !== "settlement") throw { code: 101 };

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
				order: [["paymentDate", "ASC"]],
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
				oldBracket.participant[idx].TeamId = Bracket.Team.id;
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
				message: "Success payment",
			});
		} catch (error) {
			await t.rollback();
			next(error);
		}
	}
}

module.exports = MidtransController;
