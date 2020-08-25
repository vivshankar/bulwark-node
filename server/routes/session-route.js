// import dependencies and initialize the express router
const express = require('express');
const oauthController = require('../controllers/oauth-controller');

const router = express.Router();

// define routes
router.get('/',  (req, res) => {
    res.redirect('/factors');
});
router.get('/login', oauthController.authorize);
router.get('/logout', oauthController.logout)
router.get('/oauth/callback', oauthController.aznCallback);

module.exports = router;