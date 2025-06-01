const express = require('express');
const router = express.Router();
const { isAuthenticatedUser } = require('../middleware/auth');
const { getKey, processPayment, verifyPayment } = require('../controllers/paymentController');

router.get('/getKey', isAuthenticatedUser, getKey);
router.post('/payment/process', isAuthenticatedUser, processPayment);
router.post('/paymentVerification', isAuthenticatedUser, verifyPayment);

module.exports = router;
