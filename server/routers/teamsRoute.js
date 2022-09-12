const TeamController = require('../controllers/teamsControllers');
const authentication = require('../middlewares/authentication');
const router = require('express').Router();

router.use(authentication);
// Snap Midtrans
router.get('/all-teams', TeamController.getAllTeam)
router.get('/:teamId', TeamController.getDetailTeam)
router.post('/create', TeamController.createTeam)
router.put('/edit/:teamId', TeamController.editTeam)
router.patch('/delete/:teamId', TeamController.deleteTeam)

module.exports = router;