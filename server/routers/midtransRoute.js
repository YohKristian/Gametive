const MidtransController = require('../controllers/midtransControllers');
const authentication = require('../middlewares/authentication');
const router = require('express').Router();

router.use(authentication);
// Snap Midtrans
router.post('/snap-token', MidtransController.generateSnapToken)

// router.patch('/change-status-to-payed', MidtransController.updateStatusToPayed)

module.exports = router;