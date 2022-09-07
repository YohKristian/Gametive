const { Participant, Team, Event } = require("../models");
const { Op } = require("sequelize");

module.exports = class participantsController {
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
  static async fetchOneParticipant(req, res, next) {
    try {
      const { participantId } = req.params;
      const fetchResponse = await Participant.findOne({
        where: { id: +participantId },
        include: [{ model: Team }, { model: Event }],
      });

      if (!fetchResponse)
        return res.status(404).json({ message: "data not found" });

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
