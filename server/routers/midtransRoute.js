const MidtransController = require('../controllers/midtransControllers');
const authentication = require('../middlewares/authentication');
const router = require('express').Router();

// Snap Midtrans
router.post('/snap-token', authentication, MidtransController.generateSnapToken)

router.post('/change-status-to-payed', MidtransController.updateStatusToPayed)

module.exports = router;