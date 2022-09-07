const MidtransController = require('../controllers/midtransControllers');
const router = require('express').Router();

// Snap Midtrans
router.post('/snap-token', MidtransController.generateSnapToken)

// router.patch('/change-status-to-payed', MidtransController.updateStatusToPayed)

module.exports = router;