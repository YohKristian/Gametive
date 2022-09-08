const { Participant, Team, Event } = require("../models");
const { Op } = require("sequelize");

module.exports = class participantsController {
  static async create(req, res, next) {
    try {
      const { TeamId, EventId } = req.body;
      if (!TeamId || !EventId) throw { code: 1 };

      const [createResponse, created] = await Participant.findOrCreate({
        where: { TeamId, EventId },
        defaults: { TeamId, EventId, paymentDate: new Date() },
      });

      res.status(201).json(createResponse || created);
    } catch (error) {
      next(error);
    }
  }
  static async fetchAll(req, res, next) {
    try {
      const fetchResponse = await Participant.findAll({
        include: [{ model: Team }, { model: Event }],
      });

      res.status(200).json(fetchResponse || { message: "there is no data" });
    } catch (error) {
      next(error);
    }
  }
  static async fetchOneParticipantByEventId(req, res, next) {
    try {
      const { eventId } = req.params;
      const fetchResponse = await Participant.findOne({
        where: { EventId: +eventId },
        include: [{ model: Team }, { model: Event }],
      });

      if (!fetchResponse)
        return res.status(404).json({ message: "data not found" });

      res.status(200).json(fetchResponse);
    } catch (error) {
      next(error);
    }
  }
  static async updateByTeamId(req, res, next) {
    try {
      const { teamId } = req.params;

      const fetchResponse = await Participant.findOne({
        where: { TeamId: +teamId },
      });

      if (!fetchResponse)
        return res.status(404).json({ message: "data not found" });

      const payload = {
        paidStatus: "Paid",
        currentDate: new Date(),
      };

      await Participant.update(
        {
          statusPay: payload.paidStatus,
          paymentDate: payload.currentDate,
        },
        { where: { TeamId: +teamId } }
      );

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
      next(error);
    }
  }
  static async deleteParticipantById(req, res, next) {
    try {
      const { participantId } = req.params;

      const fetchResponse = await Participant.findOne({
        where: { id: +participantId },
      });

      if (!fetchResponse)
        return res.status(404).json({ message: "data not found" });

      await Participant.destroy({
        where: { id: +participantId },
      });

      res.status(200).json(
        fetchResponse
      );
    } catch (error) {
      next(error);
    }
  }
};