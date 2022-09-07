const TeamController = require('../controllers/teamsControllers');
const router = require('express').Router();

// Snap Midtrans
router.get('/all-teams', TeamController.getAllTeam)
router.get('/:teamId', TeamController.getDetailTeam)
router.post('/create', TeamController.createTeam)
router.put('/edit', TeamController.editTeam)
router.delete('/delete', TeamController.deleteTeam)

module.exports = router;