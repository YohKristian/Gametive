const participants = require("express").Router();
const participantsController = require("../controllers/participantsController");
const authentication = require('../middlewares/authentication');

participants.use(authentication);
participants.get("/", participantsController.fetchAll);
participants.get("/:eventId", participantsController.fetchOneParticipantByEventId);
participants.post("/", participantsController.create);
participants.put("/:eventId/:teamId", participantsController.updateByTeamId);
participants.delete("/:eventId/:teamId", participantsController.deleteParticipantById);

module.exports = participants;
