const participants = require("express").Router();

const participantsController = require("../controllers/participantsController");

participants.get("/", participantsController.fetchAll);
participants.get("/:participantId", participantsController.fetchOneParticipant);
participants.post("/", participantsController.create);
// participants.put("/:username", usersController.update);
// participants.patch("/:username", usersController.delete);

module.exports = participants;
