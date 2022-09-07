const router= require('express').Router();
const Controller= require('../controllers/eventController');

router.get('/', Controller.showAllEvent)
router.post('/add', Controller.addEvent)
router.get('/:id', Controller.showEventDetail)
router.put('/:id', Controller.editEvent)
router.patch('/:id', Controller.patchStatus)



module.exports= router

