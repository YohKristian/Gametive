const router = require("express").Router();
const Controller = require("../controllers/eventController");
const authentication = require("../middlewares/authentication");

router.get("/", Controller.showAllEvent);
router.get("/:id", Controller.showEventDetail);
router.post("/add", authentication, Controller.addEvent);
router.put("/:id/bracket", authentication, Controller.editBracket);
router.put("/:id", authentication, Controller.editEvent);
router.patch("/:id", authentication, Controller.patchStatus);

module.exports = router;
