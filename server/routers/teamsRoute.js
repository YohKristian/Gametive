const TeamController = require('../controllers/teamsControllers');
const router = require('express').Router();

// Snap Midtrans
router.get('/all-teams', TeamController.getAllTeam)
router.get('/:teamId', TeamController.getDetailTeam)
router.post('/create', TeamController.createTeam)
router.put('/edit/:teamId', TeamController.editTeam)
router.delete('/delete/:teamId', TeamController.deleteTeam)

module.exports = router;