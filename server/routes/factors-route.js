// import dependencies and initialize the express router
const express = require('express');
const controller = require('../controllers/factors-controller');
const smsController = require('../controllers/smsotp-controller');

const router = express.Router();

// define routes
router.get('/json', controller.getEnrollments);
router.post('/smsotp/enroll', smsController.enroll);
router.post('/smsotp/auth', smsController.initiateAuth);
router.post('/smsotp/verify', smsController.verify);
router.delete('/smsotp/:factorId', smsController.delete);
router.get('', controller.getEnrollmentsView);

module.exports = router;