const participants = require("express").Router();

const participantsController = require("../controllers/participantsController");

participants.get("/", participantsController.fetchAll);
participants.get("/:eventId", participantsController.fetchOneParticipantByEventId);
participants.post("/", participantsController.create);
participants.put("/:teamId", participantsController.updateByTeamId);
participants.delete("/:participantId", participantsController.deleteParticipantById);

module.exports = participants;
