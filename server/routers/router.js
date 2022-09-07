const router = require('express').Router();
//routes
const users = require('./usersRoute');
const participants = require('./participantsRoute');

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'OK',
  });
});

router.use('/users', users);
router.use('/participants', participants);

module.exports = router;
